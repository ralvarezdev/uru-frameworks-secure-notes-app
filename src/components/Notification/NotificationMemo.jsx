import Notification from "./Notification.jsx";
import {memo} from "react";

// Memoized notification component
const MemoizedNotification = memo(Notification);

export default MemoizedNotification;