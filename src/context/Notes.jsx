import {createContext, useCallback, useContext, useState} from 'react';

// Create a context
const NotesContext = createContext();

// Create a provider
export default function NotesProvider({children}) {
    const [notes, setNotes] = useState([]);

    // Add a note to the list
    const addNote = useCallback((note) => {
        setNotes((prevNotes) => [...prevNotes, ...note]);
    }, []);

    // Remove a note from the list by ID
    const removeNoteByID = useCallback((id) => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    }, []);

    // Clear all notes
    const clearNotes = useCallback(() => {
        setNotes([]);
    }, []);

    // Add a note tag to the list
    const addNoteTag = useCallback((id, noteTag) => {
        setNotes((prevNotes) => prevNotes.map((note) => {
            if (note.id === id) {
                return {...note, noteTags: [...note.noteTags, noteTag]};
            }
            return note;
        }));
    }, []);

    // Remove a note tag from the list by note tag ID
    const removeNoteTagByNoteTagID = useCallback((id, noteTagID) => {
        setNotes((prevNotes) => prevNotes.map((note) => {
            if (note.id === id) {
                return {...note, noteTags: note.noteTags.filter((noteTag) => noteTag.id !== noteTagID)};
            }
            return note;
        }));
    }, []);

    // Remove a note tag from the list by tag ID
    const removeNoteTagByTagID = useCallback((id, tagID) => {
        setNotes((prevNotes) => prevNotes.map((note) => {
            if (note.id === id) {
                return {...note, noteTags: note.noteTags.filter((noteTag) => noteTag.tagID !== tagID)};
            }
            return note;
        }));
    }, []);

    // Add a note version to the list
    const addNoteVersion = useCallback((id, noteVersion) => {
        setNotes((prevNotes) => prevNotes.map((note) => {
            if (note.id === id) {
                return {...note, noteVersions: [...note.noteVersions, noteVersion]};
            }
            return note;
        }));
    }, []);

    // Remove a note version from the list by note version ID
    const removeNoteVersionByNoteVersionID = useCallback((id, noteVersionID) => {
        setNotes((prevNotes) => prevNotes.map((note) => {
            if (note.id === id) {
                return {...note, noteVersions: note.noteVersions.filter((noteVersion) => noteVersion.id !== noteVersionID)};
            }
            return note;
        }));
    }, []);

    return (
        <NotesContext.Provider value={{
            notes,
            addNote,
            removeNoteByID,
            clearNotes,
            addNoteTag,
            removeNoteTagByNoteTagID,
            removeNoteTagByTagID,
            addNoteVersion,
            removeNoteVersionByNoteVersionID
        }}>
            {children}
        </NotesContext.Provider>
    );
}

// Custom hook that shorthands the context
export function useNotes() {
    return useContext(NotesContext);
}
