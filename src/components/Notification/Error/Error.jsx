import './Error.css'
import MemoizedNotification from "../NotificationMemo.jsx";

// Error notification component
export default function ErrorNotification({className, children, ...props}) {
    return (
        <MemoizedNotification
            className={['notification__main-container--error', className].join(' ')} {...props}>
            {children}
        </MemoizedNotification>
    )
}