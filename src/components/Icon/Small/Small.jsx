import './Small.css'
import Icon from "../Icon.jsx";

// Small icon component
export default function SmallIcon({className, children, ...props}) {
    return (
        <Icon
            className={['icon--small__container', className].join(' ')} {...props}>
            {children}
        </Icon>
    )
}