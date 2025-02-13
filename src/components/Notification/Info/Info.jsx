import './Info.css'
import Notification from "../Notification.jsx";

// Info notification component
export default function InfoNotification({className, children, ...props}) {
    return (
        <Notification
            className={['notification__main-container--info', className].join(' ')} {...props}>
            {children}
        </Notification>
    )
}