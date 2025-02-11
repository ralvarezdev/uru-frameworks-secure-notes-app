import {IS_DEBUG} from "@ralvarezdev/js-mode";

// Log formats
const REQUEST_LOG_FORMAT = 'Requesting %s %s:\nbody=%s';
const RESPONSE_LOG_FORMAT = 'Response from %s %s:\nstatus=%s\nbody=%s';

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

    // Get the response
    const body = await response.json();

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