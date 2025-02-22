import {OBJECT_STORES} from "./init.js";

// Errors that can be thrown by the transactions
export const ADD_DATA_ERROR = 'Add data error';
export const READ_DATA_ERROR = 'Read data error';
export const UPDATE_DATA_ERROR = 'Upsert data error';
export const DELETE_DATA_ERROR = 'Delete data error';
export const READ_ALL_DATA_ERROR = 'Read all data error';

// Add data
export function addData(dbReady, storeName, data) {
    return new Promise((resolve, reject) => {
        // Create a new transaction
        const transaction = dbReady.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.add(data);

        // Handle successful requests
        request.onsuccess = function () {
            resolve(request.result);
        };

        // Handle errors
        request.onerror = function (event) {
            reject(ADD_DATA_ERROR + ': ' + event.target.errorCode);
        };
    });
}

// Read data
export function readData(dbReady, storeName, key) {
    return new Promise((resolve, reject) => {
        // Create a new transaction
        const transaction = dbReady.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.get(key);

        // Handle successful requests
        request.onsuccess = function () {
            resolve(request.result);
        };

        // Handle errors
        request.onerror = function (event) {
            reject(READ_DATA_ERROR + ': ' + event.target.errorCode);
        };
    });
}

// Read all data
export function readAllData(dbReady, storeName, query = null, count = undefined) {
    return new Promise((resolve, reject) => {
        // Create a new transaction
        const transaction = dbReady.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.getAll(query, count);

        // Handle successful requests
        request.onsuccess = function () {
            resolve(request.result);
        };

        // Handle errors
        request.onerror = function (event) {
            reject(READ_ALL_DATA_ERROR + ': ' + event.target.errorCode);
        };
    });
}

// Upsert data
export function upsertData(dbReady, storeName, data) {
    return new Promise((resolve, reject) => {
        // Create a new transaction
        const transaction = dbReady.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.put(data);

        // Handle successful requests
        request.onsuccess = function () {
            resolve(request.result);
        };

        // Handle errors
        request.onerror = function (event) {
            reject(UPDATE_DATA_ERROR + ': ' + event.target.errorCode);
        };
    });
}

// Delete data
function deleteData(dbReady, storeName, key) {
    return new Promise((resolve, reject) => {
        // Create a new transaction
        const transaction = dbReady.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.delete(key);

        // Handle successful requests
        request.onsuccess = function () {
            resolve(request.result);
        };

        // Handle errors
        request.onerror = function (event) {
            reject(DELETE_DATA_ERROR + ': ' + event.target.errorCode);
        };
    });
}

// Add User Tag
export function AddUserTag(dbReady, userTag) {
    return addData(dbReady, OBJECT_STORES.USER_TAGS, userTag);
}

// Read User Tag
export function ReadUserTag(dbReady, key) {
    return readData(dbReady, OBJECT_STORES.USER_TAGS, key);
}

// Read all User Tags
export function ReadAllUserTags(dbReady, query, count) {
    return readAllData(dbReady, OBJECT_STORES.USER_TAGS, query, count);
}

// Upsert User Tag
export function UpsertUserTag(dbReady, userTag) {
    return upsertData(dbReady, OBJECT_STORES.USER_TAGS, userTag);
}

// Delete User Tag
export function DeleteUserTag(dbReady, key) {
    return deleteData(dbReady, OBJECT_STORES.USER_TAGS, key);
}

// Add User Note
export function AddUserNote(dbReady, userNote) {
    return addData(dbReady, OBJECT_STORES.USER_NOTES, userNote);
}

// Read User Note
export function ReadUserNote(dbReady, key) {
    return readData(dbReady, OBJECT_STORES.USER_NOTES, key);
}

// Read all User Notes
export function ReadAllUserNotes(dbReady, query, count) {
    return readAllData(dbReady, OBJECT_STORES.USER_NOTES, query, count);
}

// Upsert User Note
export function UpsertUserNote(dbReady, userNote) {
    return upsertData(dbReady, OBJECT_STORES.USER_NOTES, userNote);
}

// Delete User Note
export function DeleteUserNote(dbReady, key) {
    return deleteData(dbReady, OBJECT_STORES.USER_NOTES, key);
}

// Add User Note Version
export function AddUserNoteVersion(dbReady, userNoteVersion) {
    return addData(dbReady, OBJECT_STORES.USER_NOTE_VERSIONS, userNoteVersion);
}

// Read User Note Version
export function ReadUserNoteVersion(dbReady, key) {
    return readData(dbReady, OBJECT_STORES.USER_NOTE_VERSIONS, key);
}

// Read all User Note Versions
export function ReadAllUserNoteVersions(dbReady, query, count) {
    return readAllData(dbReady, OBJECT_STORES.USER_NOTE_VERSIONS, query, count);
}

// Upsert User Note Version
export function UpsertUserNoteVersion(dbReady, userNoteVersion) {
    return upsertData(dbReady, OBJECT_STORES.USER_NOTE_VERSIONS, userNoteVersion);
}

// Delete User Note Version
export function DeleteUserNoteVersion(dbReady, key) {
    return deleteData(dbReady, OBJECT_STORES.USER_NOTE_VERSIONS, key);
}

// Add User Note Tag
export function AddUserNoteTag(dbReady, userNoteTag) {
    return addData(dbReady, OBJECT_STORES.USER_NOTE_TAGS, userNoteTag);
}

// Read User Note Tag
export function ReadUserNoteTag(dbReady, key) {
    return readData(dbReady, OBJECT_STORES.USER_NOTE_TAGS, key);
}

// Read all User Note Tags
export function ReadAllUserNoteTags(dbReady, query, count) {
    return readAllData(dbReady, OBJECT_STORES.USER_NOTE_TAGS, query, count);
}

// Upsert User Note Tag
export function UpsertUserNoteTag(dbReady, userNoteTag) {
    return upsertData(dbReady, OBJECT_STORES.USER_NOTE_TAGS, userNoteTag);
}

// Delete User Note Tag
export function DeleteUserNoteTag(dbReady, key) {
    return deleteData(dbReady, OBJECT_STORES.USER_NOTE_TAGS, key);
}

// Add To Sync
export function AddToSync(dbReady, toSync) {
    return addData(dbReady, OBJECT_STORES.TO_SYNC, toSync);
}

// Read To Sync
export function ReadToSync(dbReady, key) {
    return readData(dbReady, OBJECT_STORES.TO_SYNC, key);
}

// Read all To Sync
export function ReadAllToSync(dbReady, query, count) {
    return readAllData(dbReady, OBJECT_STORES.TO_SYNC, query, count);
}

// Upsert To Sync
export function UpsertToSync(dbReady, toSync) {
    return upsertData(dbReady, OBJECT_STORES.TO_SYNC, toSync);
}

// Delete To Sync
export function DeleteToSync(dbReady, key) {
    return deleteData(dbReady, OBJECT_STORES.TO_SYNC, key);
}