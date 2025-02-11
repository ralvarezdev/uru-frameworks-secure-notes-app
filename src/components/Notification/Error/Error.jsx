import './Error.css'
import Notification from "../Notification.jsx";

// Error notification component
export default function ErrorNotification({className, children, ...props}) {
    return (
        <Notification className={['error', 'notification-text', className].join(' ')} {...props}>
            {children}
        </Notification>
    )
}