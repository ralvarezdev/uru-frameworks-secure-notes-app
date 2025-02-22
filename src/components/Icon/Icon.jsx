// Icon component
export default function Icon({className, children, ...props}) {
    return (
        <span
            className={["material-symbols-outlined", className].join(' ')} {...props}>
            {children}
        </span>
    )
}