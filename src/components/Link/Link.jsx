import {Link as RouterLink} from "react-router-dom";
import Text from "../Text/Text.jsx";
import './Link.css'

// Link component
export default function Link({className, to, children, ...props}) {
    return (
        <RouterLink to={to}>
            <Text
                className={['link', className].join(' ')} {...props}>{children}</Text>
        </RouterLink>
    )
}
