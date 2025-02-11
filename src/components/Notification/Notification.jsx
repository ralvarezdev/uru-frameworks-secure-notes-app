import './Notification.css'

// Notification component
export default function Notification({className, children, ...props}) {
    return (
        <div className={['notification', className].join(' ')} {...props}>
            {children}
        </div>
    )
}
