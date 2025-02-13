import './Label.css'

// Label component
export default function Label({htmlFor, className, children, ...props}) {
    return (
        <div className='label__container'>
            <label className={['label__container__label', className].join(' ')}
                   htmlFor={htmlFor} {...props}>
                {children}
            </label>
        </div>
    )
}
