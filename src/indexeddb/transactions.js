import {OBJECT_STORES} from "./init.js";

// Errors that can be thrown by the transactions
export const ADD_DATA_ERROR = 'Add data error';
export const READ_DATA_ERROR = 'Read data error';
export const UPDATE_DATA_ERROR = 'Upsert data error';
export const DELETE_DATA_ERROR = 'Delete data error';
export const READ_ALL_DATA_ERROR = 'Read all data error';

// Add Data
export function addData(db, storeName, data) {
    return new Promise((resolve, reject) => {
        // Create a new transaction
        const transaction = db.transaction([storeName], 'readwrite');
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

// Read Data
export function readData(db, storeName, key) {
    return new Promise((resolve, reject) => {
        // Create a new transaction
        const transaction = db.transaction([storeName], 'readonly');
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

// Read All Data
export function readAllData(db, storeName, query = null, count = undefined) {
    return new Promise((resolve, reject) => {
        // Create a new transaction
        const transaction = db.transaction([storeName], 'readonly');
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

// Upsert Data
export function upsertData(db, storeName, data) {
    return new Promise((resolve, reject) => {
        // Create a new transaction
        const transaction = db.transaction([storeName], 'readwrite');
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

// Delete Data
function deleteData(db, storeName, key) {
    return new Promise((resolve, reject) => {
        // Create a new transaction
        const transaction = db.transaction([storeName], 'readwrite');
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
export function AddUserTag(db, userTag) {
    return addData(db, OBJECT_STORES.USER_TAGS, userTag);
}

// Read User Tag
export function ReadUserTag(db, key) {
    return readData(db, OBJECT_STORES.USER_TAGS, key);
}

// Read All User Tags
export function ReadAllUserTags(db, query, count) {
    return readAllData(db, OBJECT_STORES.USER_TAGS, query, count);
}

// Upsert User Tag
export function UpsertUserTag(db, userTag) {
    return upsertData(db, OBJECT_STORES.USER_TAGS, userTag);
}

// Delete User Tag
export function DeleteUserTag(db, key) {
    return deleteData(db, OBJECT_STORES.USER_TAGS, key);
}

// Add User Note
export function AddUserNote(db, userNote) {
    return addData(db, OBJECT_STORES.USER_NOTES, userNote);
}

// Read User Note
export function ReadUserNote(db, key) {
    return readData(db, OBJECT_STORES.USER_NOTES, key);
}

// Read All User Notes
export function ReadAllUserNotes(db, query, count) {
    return readAllData(db, OBJECT_STORES.USER_NOTES, query, count);
}

// Upsert User Note
export function UpsertUserNote(db, userNote) {
    return upsertData(db, OBJECT_STORES.USER_NOTES, userNote);
}

// Delete User Note
export function DeleteUserNote(db, key) {
    return deleteData(db, OBJECT_STORES.USER_NOTES, key);
}

// Add User Note Version
export function AddUserNoteVersion(db, userNoteVersion) {
    return addData(db, OBJECT_STORES.USER_NOTE_VERSIONS, userNoteVersion);
}

// Read User Note Version
export function ReadUserNoteVersion(db, key) {
    return readData(db, OBJECT_STORES.USER_NOTE_VERSIONS, key);
}

// Read All User Note Versions
export function ReadAllUserNoteVersions(db, query, count) {
    return readAllData(db, OBJECT_STORES.USER_NOTE_VERSIONS, query, count);
}

// Upsert User Note Version
export function UpsertUserNoteVersion(db, userNoteVersion) {
    return upsertData(db, OBJECT_STORES.USER_NOTE_VERSIONS, userNoteVersion);
}

// Delete User Note Version
export function DeleteUserNoteVersion(db, key) {
    return deleteData(db, OBJECT_STORES.USER_NOTE_VERSIONS, key);
}

// Add User Note Tag
export function AddUserNoteTag(db, userNoteTag) {
    return addData(db, OBJECT_STORES.USER_NOTE_TAGS, userNoteTag);
}

// Read User Note Tag
export function ReadUserNoteTag(db, key) {
    return readData(db, OBJECT_STORES.USER_NOTE_TAGS, key);
}

// Read All User Note Tags
export function ReadAllUserNoteTags(db, query, count) {
    return readAllData(db, OBJECT_STORES.USER_NOTE_TAGS, query, count);
}

// Upsert User Note Tag
export function UpsertUserNoteTag(db, userNoteTag) {
    return upsertData(db, OBJECT_STORES.USER_NOTE_TAGS, userNoteTag);
}

// Delete User Note Tag
export function DeleteUserNoteTag(db, key) {
    return deleteData(db, OBJECT_STORES.USER_NOTE_TAGS, key);
}