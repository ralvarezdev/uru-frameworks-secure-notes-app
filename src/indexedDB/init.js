import DeepFreeze from "@ralvarezdev/js-deep-freeze";

// Database name and version
export const DB_NAME = 'secure-notes';
export const DB_VERSION = 1;

// Database
export let db
export let dbReady;

// Object stores
export const OBJECT_STORES = DeepFreeze({
    USER_TAGS: 'user_tags',
    USER_NOTES: 'user_notes',
    USER_NOTE_TAGS: 'user_note_tags',
    USER_NOTE_VERSIONS: 'user_note_versions',
    TO_SYNC: 'to_sync'
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
    return new Promise((resolve,  reject)=> {
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

            if (!db.objectStoreNames.contains(OBJECT_STORES.TO_SYNC)) {
                const toSyncObjectStore = db.createObjectStore(OBJECT_STORES.TO_SYNC, {keyPath: 'id'});
                toSyncObjectStore.createIndex('action', 'action', {unique: false});
            }

            console.log('Database created successfully');
        };

        // Log the success
        dbRequest.onsuccess = function (event) {
            db = event.target.result;
            if (onSuccess)
                onSuccess(event)
            resolve(db)
        };

        dbRequest.onerror = function (event) {
            if (onError)
                onError(event)
            reject(event)
        };
    })
}

// Close the database
export function closeDatabase() {
    db?.close();
}