import './Error.css'
import Notification from "../Notification.jsx";

// Error notification component
export default function Error({className, children, ...props}) {
    return (
        <Notification className={['error', className].join(' ')} {...props}>
            {children}
        </Notification>
    )
}