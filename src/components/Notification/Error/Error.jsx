import './Error.css'
import Notification from "../Notification.jsx";

// Error notification component
export default function NotificationError({className, children, ...props}) {
    return (
        <Notification
            className={['notification--error', className].join(' ')} {...props}>
            {children}
        </Notification>
    )
}