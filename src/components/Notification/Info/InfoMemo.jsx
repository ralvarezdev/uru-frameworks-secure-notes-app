import InfoNotification from "./Info.jsx";
import {memo} from "react";

// Memoized info notification component
const MemoizedInfoNotification = memo(InfoNotification);

export default MemoizedInfoNotification;