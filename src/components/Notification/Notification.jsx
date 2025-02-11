import './Notification.css'

// Notification component
export default function Notification({className, children, onClose, ...props}) {
    return (
        <div className={['notification', className].join(' ')} {...props}>
            {children}
        </div>
    )
}

