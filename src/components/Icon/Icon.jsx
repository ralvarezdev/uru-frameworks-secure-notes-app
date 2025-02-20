import './Icon.css'

// Icon component
export default function Icon({className, children, ...props}) {
    return (
        <span
            className={['icon__container', "material-symbols-outlined", className].join(' ')} {...props}>
            {children}
        </span>
    )
}