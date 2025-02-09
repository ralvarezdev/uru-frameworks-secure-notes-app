import './Icon.css'
import TransparentButton from "../Transparent.jsx";

// Transparent button icon component
function Icon({className, children, ...props}) {
    return (
           <TransparentButton className={['icon', className].join(' ')} {...props}>
                <span className="material-symbols-outlined">
                    {children}
                </span>
           </TransparentButton>
    )
}

export default Icon;