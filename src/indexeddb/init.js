import DeepFreeze from "@ralvarezdev/js-deep-freeze";

// Database name and version
export const DB_NAME = 'secure-notes';
export const DB_VERSION = 1;

// Database
export let db;

// Object stores
export const OBJECT_STORES = DeepFreeze({
    USER_TAGS: 'user_tags',
    USER_NOTES: 'user_notes',
    USER_NOTE_TAGS: 'user_note_tags',
    USER_NOTE_VERSIONS: 'user_note_versions',
});

// Function to get the database name
export function getDatabaseName(userID) {
    return DB_NAME + ':' + userID;
}

// Create a new database request
export function openDatabase({
                                 userID, onSuccess = () => {
    }, onError = () => {
    }
                             }) {
    // Create the database request
    const dbRequest = indexedDB.open(getDatabaseName(userID), DB_VERSION);

    // Create the object store
    dbRequest.onupgradeneeded = function (event) {
        db = event.target.result;

        // Create the object stores
        if (!db.objectStoreNames.contains(OBJECT_STORES.USER_TAGS)) {
            const tagsObjectStore = db.createObjectStore(OBJECT_STORES.USER_TAGS, {keyPath: 'id'});
            tagsObjectStore.createIndex('name', 'name', {unique: true});
        }

        if (!db.objectStoreNames.contains(OBJECT_STORES.USER_NOTES)) {
            const notesObjectStore = db.createObjectStore(OBJECT_STORES.USER_NOTES, {keyPath: 'id'});
            notesObjectStore.createIndex('title', 'title', {unique: false});
        }

        if (!db.objectStoreNames.contains(OBJECT_STORES.USER_NOTE_TAGS)) {
            const noteTagsObjectStore = db.createObjectStore(OBJECT_STORES.USER_NOTE_TAGS, {keyPath: 'id'});
            noteTagsObjectStore.createIndex('note_id', 'note_id', {unique: false});
            noteTagsObjectStore.createIndex('tag_id', 'tag_id', {unique: false});
        }

        if (!db.objectStoreNames.contains(OBJECT_STORES.USER_NOTE_VERSIONS)) {
            const noteVersionObjectStore = db.createObjectStore(OBJECT_STORES.USER_NOTE_VERSIONS, {keyPath: 'id'});
            noteVersionObjectStore.createIndex('note_id', 'note_id', {unique: false});
        }

        console.log('Database created successfully');
    };

    // Log the success
    dbRequest.onsuccess = function (event) {
        db = event.target.result;
        onSuccess(event)
    };

    dbRequest.onerror = function (event) {
        onError(event)
    };
}

// Close the database
export function closeDatabase() {
    db?.close();
}