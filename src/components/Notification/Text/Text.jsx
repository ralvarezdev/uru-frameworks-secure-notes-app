import './Text.css'
import Notification from "../Notification.jsx";

// Text notification component
export default function Text({className, children, ...props}) {
    return (
        <Notification className={['text', className].join(' ')} {...props}>
            {children}
        </Notification>
    )
}