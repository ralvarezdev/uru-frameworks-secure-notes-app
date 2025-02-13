import './Info.css'
import MemoizedNotification from "../NotificationMemo.jsx";

// Info notification component
export default function InfoNotification({className, children, ...props}) {
    return (
        <MemoizedNotification
            className={['notification__main-container--info', className].join(' ')} {...props}>
            {children}
        </MemoizedNotification>
    )
}