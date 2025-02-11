import './Label.css'

// Label component
export default function Label({htmlFor, className, children, ...props}) {
    return (
        <label className={['label', 'label-text', className].join(' ')}
               htmlFor={htmlFor} {...props}>{children}</label>
    )
}
