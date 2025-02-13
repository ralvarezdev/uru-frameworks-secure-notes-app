import {Link as RouterLink} from "react-router-dom";
import './Link.css'

// Link component
export default function Link({className, to, children, ...props}) {
    return (
        <RouterLink to={to} className={['link__text', className].join(' ')} {...props}>
            {children}
        </RouterLink>
    )
}
