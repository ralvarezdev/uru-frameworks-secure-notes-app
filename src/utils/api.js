import {clearCookies} from "./cookies.js";

// Log formats
const REQUEST_LOG_FORMAT = 'Requesting %s %s:\nbody=%s';
const RESPONSE_LOG_FORMAT = 'Response from %s %s:\nstatus=%s\nbody=%s';
const ERROR_LOG_FORMAT = 'An error occurred while requesting %s %s:\nerror=%s';

// Send request to the API
export async function sendRequest(method, path, bodyObject) {
    // Check if the path starts with a slash
    if (!path.startsWith('/')) path = `/${path}`;

    // Create a new request object
    const apiRequest = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyObject)
    }

    // Log the request
    if (import.meta.env.IS_DEBUG) console.log(REQUEST_LOG_FORMAT, method, path, JSON.stringify(bodyObject));

    // Fetch the API
    const response = await fetch(`/api${path}`, apiRequest);
    let body

    try {
        // Get the response
        body = await response.json();
    } catch (error) {
        // Log the error
        if (import.meta.env.IS_DEBUG) console.error(ERROR_LOG_FORMAT, method, path, error.message);

        // Return an error response
        return [response.status, {
            status: 'error',
            message: 'An error occurred, please try again later'
        }]
    }

    // Log the body
    if (import.meta.env.IS_DEBUG) console.log(RESPONSE_LOG_FORMAT, method, path, response.status, JSON.stringify(body));
    return [response.status, {...body}];
}

// Send authenticated request to the API
export async function sendAuthenticatedRequest(method, path, bodyObject) {
    // Check if the user is authenticated
    const [status, response] = await sendRequest(method, path, bodyObject);

    // Check if the user is not authenticated
    if (status === 401) {
        // Clear cookies
        clearCookies()

        // Redirect to the login page
        window.location.href = '/login';
    }

    // Return the response
    return response;
}