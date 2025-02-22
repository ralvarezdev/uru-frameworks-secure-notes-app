import {Link as RouterLink} from "react-router-dom";
import './Link.css'
import TransparentButton from "../Button/Transparent/Transparent.jsx";

// Link component
export default function Link({className, to, onClick, children, ...props}) {
    // Check if the link has the to prop
    if (!to) {
        return (
            <TransparentButton className={['link__text', className].join(' ')}
                               onClick={onClick} {...props}>
                {children}
            </TransparentButton>
        )
    }

    return (
        <RouterLink to={to}
                    className={['link__text', className].join(' ')} {...props}>
            {children}
        </RouterLink>
    )
}
