import {memo} from "react";
import ErrorTextNotification from "./Text.jsx";

// Memoized error text notification component
const MemoizedErrorTextNotification = memo(ErrorTextNotification)

export default MemoizedErrorTextNotification;