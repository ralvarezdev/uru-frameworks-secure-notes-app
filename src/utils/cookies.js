// Cookies name
export const COOKIE_SALT_NAME = import.meta.env.COOKIE_SALT_NAME;
export const COOKIE_ENCRYPTED_KEY_NAME = import.meta.env.COOKIE_ENCRYPTED_KEY_NAME;
export const COOKIE_USER_ID_NAME = import.meta.env.COOKIE_USER_ID_NAME;
export const COOKIE_USER_PASSWORD_HASH_NAME = import.meta.env.COOKIE_USER_PASSWORD_HASH_NAME;

// cookieExists is a utility function that checks if a cookie with a given name exists in the document
export default function cookieExists(cookieName) {
    const cookies = document.cookie.split(';');
    return cookies.some(cookie => cookie.trim().startsWith(`${cookieName}=`));
}

// clearCookies is a utility function that clears all cookies in the document
export function clearCookies() {
    const cookies = document.cookie.split(';');

    cookies.forEach(cookie => {
        const [name] = cookie.split('=');
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
}

// getCookie is a utility function that retrieves a cookie with a given name from the document
export function getCookie(cookieName) {
    const cookies = document.cookie.split(';');
    const cookie = cookies.find(cookie => cookie.trim().startsWith(`${cookieName}=`));
    return cookie?.split('=')[1];
}

// getUserIDFromCookie is a utility function that retrieves the user ID from the user ID cookie
export function getUserIDFromCookie() {
    return getCookie(COOKIE_USER_ID_NAME);
}

// getEncryptedKeyFromCookie is a utility function that retrieves the encrypted key from the encrypted key cookie
export function getEncryptedKeyFromCookie() {
    return getCookie(COOKIE_ENCRYPTED_KEY_NAME);
}

// getSaltFromCookie is a utility function that retrieves the salt from the salt cookie
export function getSaltFromCookie() {
    return getCookie(COOKIE_SALT_NAME);
}

// getPasswordHashFromCookie is a utility function that retrieves the password hash from the password hash cookie
export function getPasswordHashFromCookie() {
    return getCookie(COOKIE_USER_PASSWORD_HASH_NAME);
}