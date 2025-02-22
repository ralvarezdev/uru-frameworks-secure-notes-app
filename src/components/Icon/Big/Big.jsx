import './Big.css'
import Icon from "../Icon.jsx";

// Big icon component
export default function BigIcon({className, children, ...props}) {
    return (
        <Icon
            className={['icon--big__container', className].join(' ')} {...props}>
            {children}
        </Icon>
    )
}