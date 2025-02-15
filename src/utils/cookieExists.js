// cookieExists is a utility function that checks if a cookie with a given name exists in the document
function cookieExists(cookieName) {
    const cookies = document.cookie.split(';');
    console.log(document.cookie)
    return cookies.some(cookie => cookie.trim().startsWith(`${cookieName}=`));
}

export default cookieExists;