import './Info.css'
import Notification from "../Notification.jsx";

// Info notification component
export default function InfoNotification({className, children, ...props}) {
    return (
        <Notification className={['info', 'notification-text', className].join(' ')} {...props}>
            {children}
        </Notification>
    )
}