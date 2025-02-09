import './Button.css'

// Button component
function Button({className, onClick, children, ...props}) {
    return (
        <button className={['button', className].join(' ')}
                onClick={onClick} {...props}>
            {children}
        </button>
    )
}

export default Button