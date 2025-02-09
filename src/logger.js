import Logger from "@ralvarezdev/js-logger";
import {DEBUG, DEV, MODE, PROD} from "@ralvarezdev/js-mode";

// Print log entry types depending on mode
const LOG_ENTRY_TYPES = {
    [PROD]: {
        warning: true,
        error: true,
        info: false,
        debug: false,
    },
    [DEV]: {
        info: true,
        warning: true,
        error: true,
        debug: false,
    },
    [DEBUG]: {
        info: true,
        warning: true,
        error: true,
        debug: true,
    }
}[MODE]

// Create a new logger
const LOGGER = new Logger({
    ...LOG_ENTRY_TYPES
})
export default LOGGER