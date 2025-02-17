// cookieExists is a utility function that checks if a cookie with a given name exists in the document
export default function cookies(cookieName) {
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