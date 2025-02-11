// Text component
export default function Text({className, children, ...props}) {
    return (
        <p className={['text', className].join(' ')} {...props}>
            {children}
        </p>
    )
}