import './Label.css'

// Label component
export default function Label({htmlFor, className, children, ...props}) {
    return (
        <label className={['label', className].join(' ')}
               htmlFor={htmlFor} {...props}>
            <div className='label__text'>
                {children}
            </div>
        </label>
    )
}
