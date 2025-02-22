import {createContext, useCallback, useContext, useState} from 'react';
import {
    DeleteUserNote,
    DeleteUserNoteTag,
    DeleteUserNoteVersion,
    ReadAllUserNotes,
    ReadAllUserNoteTags,
    ReadAllUserNoteVersions,
    UpsertUserNote,
    UpsertUserNoteTag,
    UpsertUserNoteVersion
} from "../indexedDB/transactions.js";
import {db} from "../indexedDB/init.js";
import logger from "../logger.js";
import {encryptNoteVersionContent} from "../utils/crypto.js";

// Create a context
const NotesContext = createContext(null);

// Create a provider
export function NotesProvider({children}) {
    const [notes, setNotes] = useState([]);
    const [noteVersionsByNoteID, setNoteVersionsByNoteID] = useState({});
    const [noteTagsByNoteID, setNoteTagsByNoteID] = useState({});

    // Upsert a note to the list
    const upsertNote = useCallback(async (note, alterIndexedDB) => {
        // Check if the note has an ID
        if (!note?.id) {
            if (import.meta.env.IS_DEBUG)
                logger.error("Note ID is required")
            return;
        }

        setNotes((prevNotes) => prevNotes.map((prevNote) => {
            if (prevNote.id === note.id)
                return {...prevNote, ...note};
            return prevNote;
        }));

        // Alter the IndexedDB
        if (alterIndexedDB)
            await UpsertUserNote(db, note);
    }, [setNotes]);

    // Upsert multiple notes to the list
    const upsertNotes = useCallback(async (notes, alterIndexedDB) => {
        // Check if the notes have an ID
        if (notes.some((note) => !note?.id)) {
            if (import.meta.env.IS_DEBUG)
                logger.error("Note ID is required")
            return;
        }

        const newNotes = [...notes];
        setNotes((prevNotes) => prevNotes.map(
            (prevNote) => {
                // Find the note index
                const noteIndex = notes.findIndex((note) => note.id === prevNote.id);
                if (noteIndex >= 0) {
                    newNotes.splice(noteIndex, 1);
                    return {...prevNote, ...notes[noteIndex]};
                } else
                    return prevNote;
            }
        ));

        // Add the new notes
        setNotes((prevNotes) => [...prevNotes, ...newNotes]);

        // Alter the IndexedDB
        if (alterIndexedDB)
            for (const note of notes)
                await UpsertUserNote(db, note);
    }, [setNotes]);

    // Remove a note from the list by ID
    const removeNoteByID = useCallback(async (id, alterIndexedDB) => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));

        // Alter the IndexedDB
        if (alterIndexedDB)
            await DeleteUserNote(db, id);
    }, [setNotes]);

    // Get a note by ID
    const getNoteByID = useCallback((id) => {
        return notes.find((note) => note.id === id);
    }, [notes]);

    // Get the latest note
    const getLatestNote = useCallback(() => {
        return notes.reduce((latestNote, note) => {
            if (!latestNote || note.updated_at > latestNote.updated_at)
                return note;
            return latestNote;
        }, null)
    }, [notes]);

    // Get the latest note ID
    const getLatestNoteID = useCallback(() => {
        return getLatestNote()?.id
    }, [getLatestNote]);

    // Clear all notes
    const clearNotes = useCallback(() => {
        setNotes([]);
    }, [setNotes]);

    // Load notes from the IndexedDB
    const loadNotesFromIndexedDB = useCallback(async () => {
        // Clear the current notes
        clearNotes();

        // Add the notes
        const notes = await ReadAllUserNotes(db);
        await upsertNotes(notes, false);
    }, [upsertNotes, clearNotes]);

    // Upsert a note version to the list
    const upsertNoteVersion = useCallback(async (noteVersion, alterIndexedDB) => {
        // Check if the note version has an ID
        if (!noteVersion?.id) {
            if (import.meta.env.IS_DEBUG)
                logger.error("Note version ID is required")
            return;
        }

        setNoteVersionsByNoteID((prevNoteVersionsByNoteID) => {
            const noteID = noteVersion.note_id;
            const noteVersions = prevNoteVersionsByNoteID?.[noteID] || [];
            const newNoteVersions = noteVersions.map((prevNoteVersion) => {
                if (prevNoteVersion.id === noteVersion.id)
                    return {...prevNoteVersion, ...noteVersion};
                return prevNoteVersion;
            });

            return {...prevNoteVersionsByNoteID, [noteID]: newNoteVersions};
        });

        // Alter the IndexedDB
        if (alterIndexedDB) {
            // Encrypt the note version content
            noteVersion.encrypted_content = await encryptNoteVersionContent(noteVersion.encrypted_content);

            await UpsertUserNoteVersion(db, noteVersion);
        }
    }, [setNoteVersionsByNoteID]);

    // Upsert multiple note versions to the list
    const upsertNoteVersions = useCallback(async (noteVersions, alterIndexedDB) => {
        // Check if the note versions have an ID
        if (noteVersions.some((noteVersion) => !noteVersion?.id)) {
            if (import.meta.env.IS_DEBUG)
                logger.error("Note version ID is required")
            return;
        }

        // Group note versions by note ID
        const groupedNoteVersions = noteVersions.reduce((acc, noteVersion) => {
            const noteID = noteVersion.note_id;
            if (!acc?.[noteID])
                acc[noteID] = [];
            acc[noteID].push(noteVersion);
            return acc;
        })

        setNoteVersionsByNoteID((prevNoteVersionsByNoteID) => {
            // Iterate through the previous note versions
            const newGroupedNoteVersions = [...groupedNoteVersions];
            const noteVersionsByNoteID = {};
            for (const noteID of Object.keys(prevNoteVersionsByNoteID)) {
                const prevNoteVersions = prevNoteVersionsByNoteID[noteID];

                // Check if the note versions exist on the new grouped note versions
                if (!newGroupedNoteVersions?.[noteID]) {
                    noteVersionsByNoteID[noteID] = prevNoteVersions;
                    continue;
                }

                // Iterate through the previous note versions
                noteVersionsByNoteID[noteID] = prevNoteVersions.map(
                    (prevNoteVersion) => {
                        const noteVersions = newGroupedNoteVersions[noteID];
                        const noteVersionIndex = noteVersions.findIndex((noteVersion) => noteVersion.id === prevNoteVersion.id);
                        if (noteVersionIndex >= 0) {
                            noteVersions.splice(noteVersionIndex, 1);
                            return {...prevNoteVersion, ...noteVersions[noteVersionIndex]};
                        } else
                            return prevNoteVersion;
                    }
                );

                // Check if there are new note versions
                if (newGroupedNoteVersions[noteID].length > 0)
                    noteVersionsByNoteID[noteID] = [...noteVersionsByNoteID[noteID], ...newGroupedNoteVersions[noteID]];
            }

            return {...noteVersionsByNoteID, ...newGroupedNoteVersions};
        });

        // Alter the IndexedDB
        if (alterIndexedDB)
            for (const noteVersion of noteVersions) {
                // Encrypt the note version content
                noteVersion.encrypted_content = await encryptNoteVersionContent(noteVersion.encrypted_content);

                await UpsertUserNoteVersion(db, noteVersion);
            }
    }, [setNoteVersionsByNoteID]);

    // Remove a note version from the list by note ID and ID
    const removeNoteVersionByNoteIDAndID = useCallback(async (noteID, id, alterIndexedDB) => {
        setNoteVersionsByNoteID((prevNoteVersionsByNoteID) => {
            const noteVersions = prevNoteVersionsByNoteID?.[noteID] || [];
            return {
                ...prevNoteVersionsByNoteID,
                [noteID]: noteVersions.filter((noteVersion) => noteVersion.id !== id)
            };
        });

        // Alter the IndexedDB
        if (alterIndexedDB)
            await DeleteUserNoteVersion(db, id);
    }, [setNoteVersionsByNoteID]);

    // Get a note version by note ID and ID
    const getNoteVersionByNoteIDAndID = useCallback((noteID, id) => {
        return noteVersionsByNoteID?.[noteID]?.find((noteVersion) => noteVersion.id === id);
    }, [noteVersionsByNoteID]);

    // Get latest note version by note ID
    const getLatestNoteVersionByNoteID = useCallback((noteID) => {
        const noteVersions = noteVersionsByNoteID?.[noteID] || [];
        return noteVersions.reduce((latestNoteVersion, noteVersion) => {
            if (!latestNoteVersion || noteVersion.created_at > latestNoteVersion.created_at)
                return noteVersion;
            return latestNoteVersion;
        }, null);
    }, [noteVersionsByNoteID]);

    // Clear all note versions
    const clearNoteVersions = useCallback(() => {
        setNoteVersionsByNoteID({});
    }, [setNoteVersionsByNoteID]);

    // Load note versions from the IndexedDB
    const loadNoteVersionsFromIndexedDB = useCallback(async () => {
        // Clear the current note versions
        clearNoteVersions();

        // Add the note versions
        const noteVersions = await ReadAllUserNoteVersions(db);

        // Decrypt the note version content
        for (const noteVersion of noteVersions) {
            noteVersion.content = await encryptNoteVersionContent(noteVersion.encrypted_content);
        }

        await upsertNoteVersions(noteVersions, false);
    }, [upsertNoteVersions, clearNoteVersions]);

    // Upsert a note tag to the list
    const upsertNoteTag = useCallback(async (noteTag, alterIndexedDB) => {
        // Check if the note tag has an ID
        if (!noteTag?.id) {
            if (import.meta.env.IS_DEBUG)
                logger.error("Note tag ID is required")
            return;
        }

        setNoteTagsByNoteID((prevNoteTagsByNoteID) => {
            const noteID = noteTag.note_id;
            const noteTags = prevNoteTagsByNoteID?.[noteID] || [];
            const newNoteTags = noteTags.map((prevNoteTag) => {
                if (prevNoteTag.id === noteTag.id)
                    return {...prevNoteTag, ...noteTag};
                return prevNoteTag;
            });

            return {...prevNoteTagsByNoteID, [noteID]: newNoteTags};
        });

        // Alter the IndexedDB
        if (alterIndexedDB)
            await UpsertUserNoteTag(db, noteTag);
    }, [setNoteTagsByNoteID]);

    // Upsert multiple note tags to the list
    const upsertNoteTags = useCallback(async (noteTags, alterIndexedDB) => {
        // Check if the note tags have an ID
        if (noteTags.some((noteTag) => !noteTag?.id)) {
            if (import.meta.env.IS_DEBUG)
                logger.error("Note tag ID is required")
            return;
        }

        // Group note tags by note ID
        const groupedNoteTags = noteTags.reduce((acc, noteTag) => {
            const noteID = noteTag.note_id;
            if (!acc?.[noteID])
                acc[noteID] = [];
            acc[noteID].push(noteTag);
            return acc;
        })

        setNoteTagsByNoteID((prevNoteTagsByNoteID) => {
            // Iterate through the previous note tags
            const newGroupedNoteTags = [...groupedNoteTags];
            const noteTagsByNoteID = {};
            for (const noteID of Object.keys(prevNoteTagsByNoteID)) {
                const prevNoteTags = prevNoteTagsByNoteID[noteID];

                // Check if the note tags exist on the new grouped note tags
                if (!newGroupedNoteTags?.[noteID]) {
                    noteTagsByNoteID[noteID] = prevNoteTags;
                    continue;
                }

                // Iterate through the previous note tags
                noteTagsByNoteID[noteID] = prevNoteTags.map(
                    (prevNoteTag) => {
                        const noteTags = newGroupedNoteTags[noteID];
                        const noteTagIndex = noteTags.findIndex((noteTag) => noteTag.id === prevNoteTag.id);
                        if (noteTagIndex >= 0) {
                            noteTags.splice(noteTagIndex, 1);
                            return {...prevNoteTag, ...noteTags[noteTagIndex]};
                        } else
                            return prevNoteTag;
                    }
                );

                // Check if there are new note tags
                if (newGroupedNoteTags[noteID].length > 0)
                    noteTagsByNoteID[noteID] = [...noteTagsByNoteID[noteID], ...newGroupedNoteTags[noteID]];
            }

            return {...noteTagsByNoteID, ...newGroupedNoteTags};
        });

        // Alter the IndexedDB
        if (alterIndexedDB)
            for (const noteTag of noteTags)
                await UpsertUserNoteTag(db, noteTag);
    }, [setNoteTagsByNoteID]);

    // Remove a note tag from the list by note ID and ID
    const removeNoteTagByNoteIDAndID = useCallback(async (noteID, id, alterIndexedDB) => {
        setNoteTagsByNoteID((prevNoteTagsByNoteID) => {
            const noteTags = prevNoteTagsByNoteID?.[noteID] || [];
            return {
                ...prevNoteTagsByNoteID,
                [noteID]: noteTags.filter((noteTag) => noteTag.id !== id)
            };
        });

        // Alter the IndexedDB
        if (alterIndexedDB)
            await DeleteUserNoteTag(db, id);
    }, [setNoteTagsByNoteID]);

    // Get a note tag by note ID and ID
    const getNoteTagByNoteIDAndID = useCallback((noteID, id) => {
        return noteTagsByNoteID?.[noteID]?.find((noteTag) => noteTag.id === id);
    }, [noteTagsByNoteID]);

    // Clear all note tags
    const clearNoteTags = useCallback(() => {
        setNoteTagsByNoteID({});
    }, [setNoteTagsByNoteID]);

    // Load note tags from the IndexedDB
    const loadNoteTagsFromIndexedDB = useCallback(async () => {
        // Clear the current note tags
        clearNoteTags();

        // Add the note tags
        const noteTags = await ReadAllUserNoteTags(db);
        await upsertNoteTags(noteTags, false);
    }, [upsertNoteTags, clearNoteTags]);

    return (
        <NotesContext.Provider value={{
            notes,
            upsertNote,
            upsertNotes,
            removeNoteByID,
            getNoteByID,
            getLatestNote,
            getLatestNoteID,
            clearNotes,
            loadNotesFromIndexedDB,
            noteVersionsByNoteID,
            upsertNoteVersion,
            upsertNoteVersions,
            removeNoteVersionByNoteIDAndID,
            getNoteVersionByNoteIDAndID,
            getLatestNoteVersionByNoteID,
            clearNoteVersions,
            loadNoteVersionsFromIndexedDB,
            noteTagsByNoteID,
            upsertNoteTag,
            upsertNoteTags,
            removeNoteTagByNoteIDAndID,
            getNoteTagByNoteIDAndID,
            clearNoteTags,
            loadNoteTagsFromIndexedDB
        }}>
            {children}
        </NotesContext.Provider>
    );
}

// Custom hook that shorthands the context
export function useNotes() {
    return useContext(NotesContext);
}