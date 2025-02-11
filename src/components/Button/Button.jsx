import './Button.css'

// Button component
export default function Button({className, onClick, children, ...props}) {
    return (
        <button className={['button', className].join(' ')}
                onClick={onClick} {...props}>
            {children}
        </button>
    )
}