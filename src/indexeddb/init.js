// Database name and version
import DeepFreeze from "@ralvarezdev/js-deep-freeze";

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
    TO_SYNC: 'to_sync',
});

// Function to get the database name
export function getDatabaseName(userID) {
    return DB_NAME + ':' + userID;
}

// Create a new database request
export function openDatabase({userID, onSuccess=()=>{}, onError=()=>{}}) {
    // Create the database request
    const dbRequest = indexedDB.open(getDatabaseName(userID), DB_VERSION);

    // Create the object store
    dbRequest.onupgradeneeded = function (event) {
        db = event.target.result;

        // Create the object stores
        if (!db.objectStoreNames.contains(OBJECT_STORES.USER_TAGS)) {
            const tagsObjectStore = db.createObjectStore(OBJECT_STORES.USER_TAGS, {keyPath: 'id'});
            tagsObjectStore.createIndex('name', 'name', {unique: false});
            tagsObjectStore.createIndex('is_synced', 'is_synced', {unique: false});
        }
        
        if (!db.objectStoreNames.contains(OBJECT_STORES.USER_NOTES)) {
            const notesObjectStore = db.createObjectStore(OBJECT_STORES.USER_NOTES, {keyPath: 'id'});
            notesObjectStore.createIndex('title', 'title', {unique: false});
            notesObjectStore.createIndex('is_synced', 'is_synced', {unique: false});

        }
        
        if (!db.objectStoreNames.contains(OBJECT_STORES.USER_NOTE_TAGS)) {
            const noteTagsObjectStore=db.createObjectStore(OBJECT_STORES.USER_NOTE_TAGS, {keyPath: ['note_id', 'tag_id']});
            noteTagsObjectStore.createIndex('is_synced', 'is_synced', {unique: false});
        }
        
        if (!db.objectStoreNames.contains(OBJECT_STORES.USER_NOTE_VERSIONS)) {
            const noteVersionObjectStore = db.createObjectStore(OBJECT_STORES.USER_NOTE_VERSIONS, {keyPath: 'id'});
            noteVersionObjectStore.createIndex('note_id', 'note_id', {unique: false});
            noteVersionObjectStore.createIndex('is_synced', 'is_synced', {unique: false});
        }

        if (!db.objectStoreNames.contains(OBJECT_STORES.TO_SYNC)) {
            const toSyncObjectStore = db.createObjectStore(OBJECT_STORES.TO_SYNC, {keyPath: 'id'});
            toSyncObjectStore.createIndex('object_store', 'object_store', {unique: false});
            toSyncObjectStore.createIndex('object_id', 'object_id', {unique: false});
            toSyncObjectStore.createIndex('action', 'action', {unique: false});
            toSyncObjectStore.createIndex('field', 'field', {unique: false});
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