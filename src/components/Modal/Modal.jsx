import './Modal.css'

// Modal component
export default function Modal({children, className, ...props}) {
    return (
        <div
            className={['modal__container', className].join(' ')} {...props}>
            {children}
        </div>
    )
}