// Subheader component
export default function Subtitle({className, children, ...props}) {
    return (
        <h2 className={['subtitle', className].join(' ')} {...props}>
            {children}
        </h2>
    )
}