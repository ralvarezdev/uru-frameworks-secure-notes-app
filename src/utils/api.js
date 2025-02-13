import {IS_DEBUG} from "@ralvarezdev/js-mode";

// Log formats
const REQUEST_LOG_FORMAT = 'Requesting %s %s:\nbody=%s';
const RESPONSE_LOG_FORMAT = 'Response from %s %s:\nstatus=%s\nbody=%s';
const ERROR_LOG_FORMAT = 'An error occurred while requesting %s %s:\nerror=%s';

// Request the API
export default async function request(method, path, bodyObject) {
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
    if (IS_DEBUG) console.log(REQUEST_LOG_FORMAT, method, path, JSON.stringify(bodyObject));

    // Fetch the API
    const response = await fetch(`/api${path}`, apiRequest);
    let body

    try {
        // Get the response
        body = await response.json();
    } catch (error) {
        // Log the error
        if (IS_DEBUG) console.error(ERROR_LOG_FORMAT, method, path, error.message);

        // Return an error response
        return {
            status: 'error',
            message: 'An error occurred, please try again later'
        }
    }

    // Log the body
    if (IS_DEBUG) console.log(RESPONSE_LOG_FORMAT, method, path, response.status, JSON.stringify(body));

    // Check the status
    if (body.status === 'error') return {
        status: body.status,
        error: body.message
    };
    else if (body.status === 'success') return {
        status: body.status,
        data: body.data
    };
    return {status: body.status, data: body.data};
}