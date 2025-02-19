import './Logo.css'

// Logo text component
export default function LogoText({className, children, ...props}) {
    return (
        <p className={['text--logo', className].join(' ')} {...props}>
            {children}
        </p>
    )
}