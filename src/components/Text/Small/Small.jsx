import './Small.css'

// Small text component
export default function SmallText({className, children, ...props}) {
    return (
        <p className={['text--small', className].join(' ')} {...props}>
            {children}
        </p>
    )
}