import './Info.css'
import Notification from "../Notification.jsx";

// Info notification component
export default function Info({className, children, ...props}) {
    return (
        <Notification className={['info', className].join(' ')} {...props}>
            {children}
        </Notification>
    )
}