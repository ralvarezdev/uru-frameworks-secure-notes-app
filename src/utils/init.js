import {closeDatabase, openDatabase} from "../indexeddb/init.js";

// Handle on log in
export async function onLogIn(userID, onSuccess, onError, loadTagsFn = async () => {
}, loadNotesFn = async () => {
}) {
    // Open the database
    openDatabase({userID, onSuccess, onError});

    // Load the contexts
    await loadTagsFn()
    await loadNotesFn()
}

// Handle on log out
export async function onLogOut(clearTagsFn = async () => {
}, clearNotesFn = async () => {
}) {
    // Close the database
    closeDatabase()

    // Clear the contexts
    await clearTagsFn()
    await clearNotesFn()
}