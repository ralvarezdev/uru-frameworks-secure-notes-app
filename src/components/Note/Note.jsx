import './Note.css'

// Note component
export default function Note({children, className, ...props}) {
    return (
        <div className={['note__main-container', className].join(' ')} {...props}>
            {children}
        </div>
    )
}