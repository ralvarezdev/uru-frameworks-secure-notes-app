import ErrorNotification from "./Error.jsx";
import {memo} from "react";

// Memoized error notification component
const MemoizedErrorNotification = memo(ErrorNotification);

export default MemoizedErrorNotification;