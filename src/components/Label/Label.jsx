import './Label.css'

// Label component
function Label({htmlFor, className, children, ...props}) {
    return (
        <label className={['label', 'text', className].join(' ')}
               htmlFor={htmlFor} {...props}>{children}</label>
    )
}

export default Label