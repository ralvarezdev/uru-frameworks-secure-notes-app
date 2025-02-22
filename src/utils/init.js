import {closeDatabase, openDatabase} from "../indexedDB/init.js";

// Handle on dashboard load
export async function onDashboardLoad(userID, onSuccess, onError, loadTagsFn = async () => {
}, loadNotesFn = async () => {
}) {
    // Open the database
    await openDatabase({userID, onSuccess, onError});

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