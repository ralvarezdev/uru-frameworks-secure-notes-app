// Session storage username key
export const SESSION_STORAGE_USERNAME_KEY = 'username';

// Session storage password key
export const SESSION_STORAGE_PASSWORD_KEY = 'password';

// Session storage 2FA methods key
export const SESSION_STORAGE_2FA_METHODS_KEY = '2fa-methods';

// Session storage is logging in key
export const SESSION_STORAGE_IS_LOGGING_IN_KEY = 'is-logging-in';

// Set username in session storage
export function setUsername(username) {
    sessionStorage.setItem(SESSION_STORAGE_USERNAME_KEY, username);
}

// Get username from session storage
export function getUsername() {
    return sessionStorage.getItem(SESSION_STORAGE_USERNAME_KEY);
}

// Remove username from session storage
export function removeUsername() {
    sessionStorage.removeItem(SESSION_STORAGE_USERNAME_KEY);
}

// Set password in session storage
export function setPassword(password) {
    sessionStorage.setItem(SESSION_STORAGE_PASSWORD_KEY, password);
}

// Get password from session storage
export function getPassword() {
    return sessionStorage.getItem(SESSION_STORAGE_PASSWORD_KEY);
}

// Remove password from session storage
export function removePassword() {
    sessionStorage.removeItem(SESSION_STORAGE_PASSWORD_KEY);
}

// Set 2FA methods in session storage
export function set2FAMethods(methods) {
    sessionStorage.setItem(SESSION_STORAGE_2FA_METHODS_KEY, methods);
}

// Get 2FA methods from session storage
export function get2FAMethods() {
    return sessionStorage.getItem(SESSION_STORAGE_2FA_METHODS_KEY);
}

// Remove 2FA methods from session storage
export function remove2FAMethods() {
    sessionStorage.removeItem(SESSION_STORAGE_2FA_METHODS_KEY);
}

// Set is logging in session storage
export function setIsLoggingIn(isLogin) {
    sessionStorage.setItem(SESSION_STORAGE_IS_LOGGING_IN_KEY, isLogin);
}

// Get is logging in from session storage
export function getIsLoggingIn() {
    return sessionStorage.getItem(SESSION_STORAGE_IS_LOGGING_IN_KEY);
}

// Remove is logging in from session storage
export function removeIsLoggingIn() {
    sessionStorage.removeItem(SESSION_STORAGE_IS_LOGGING_IN_KEY);
}

// Clear session storage
export function clearSessionStorage() {
    sessionStorage.clear();
}

