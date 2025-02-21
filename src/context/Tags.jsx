import {createContext, useCallback, useContext, useState} from 'react';
import {
    DeleteUserTag,
    ReadAllUserTags,
    UpsertUserTag
} from "../indexeddb/transactions.js";
import {db} from "../indexeddb/init.js";
import logger from "../logger.js";

// Create a context
const TagsContext = createContext();

// Create a provider
export default function TagsProvider({children}) {
    const [tags, setTags] = useState([]);

    // Upsert a tag to the list
    const upsertTag = useCallback(async (tag, alterIndexedDB) => {
        // Check if the tag has an ID
        if (!tag?.id) {
            if (import.meta.env.IS_DEBUG)
                logger.error("Tag ID is required")
            return;
        }

        setTags((prevTags) => prevTags.map((prevTag) => {
            if (prevTag.id === tag.id)
                return {...prevTag, ...tag};
            return prevTag;
        }));

        // Alter the IndexedDB
        if (alterIndexedDB)
            await UpsertUserTag(db, tag);
    }, [setTags]);

    // Upsert multiple tags to the list
    const upsertTags = useCallback(async (tags, alterIndexedDB) => {
        // Check if the tags have an ID
        if (tags.some((tag) => !tag?.id)) {
            if (import.meta.env.IS_DEBUG)
                logger.error("Tag ID is required")
            return;
        }

        const newTags = [...tags]
        setTags((prevTags) => prevTags.map(
            (prevTag) => {
                // Find the tag index
                const tagIndex = tags.findIndex((tag) => tag.id === prevTag.id);
                if (tagIndex >= 0) {
                    newTags.splice(tagIndex, 1);
                    return {...prevTag, ...tags[tagIndex]};
                } else
                    return prevTag;
            }
        ));

        // Add the new tags
        setTags((prevTags) => [...prevTags, ...newTags]);

        // Alter the IndexedDB
        if (alterIndexedDB)
            for (const tag of tags)
                await UpsertUserTag(db, tag);
    }, [setTags]);

    // Remove a tag from the list by ID
    const removeTagByID = useCallback(async (id, alterIndexedDB) => {
        setTags((prevTags) => prevTags.filter((tag) => tag.id !== id));

        // Alter the IndexedDB
        if (alterIndexedDB)
            await DeleteUserTag(db, id);
    }, [setTags]);

    // Get a tag by ID
    const getTagByID = useCallback((id) => {
        return tags.find((tag) => tag.id === id);
    }, [tags]);

    // Remove all tags
    const clearTags = useCallback(() => {
        setTags([]);
    }, [setTags]);

    // Load tags from IndexedDB
    const loadTagsFromIndexedDB = useCallback(async () => {
        // Clear the current tags
        clearTags();

        // Load from IndexedDB
        const tags = await ReadAllUserTags(db)
        await upsertTags(tags, false)
    }, [clearTags, upsertTags]);

    return (
        <TagsContext.Provider value={{
            upsertTag,
            upsertTags,
            removeTagByID,
            getTagByID,
            clearTags,
            loadTagsFromIndexedDB
        }}>
            {children}
        </TagsContext.Provider>
    );
}

// Custom hook that shorthands the context
export function useTags() {
    return useContext(TagsContext);
}