import './Medium.css'
import Icon from "../Icon.jsx";

// Medium icon component
export default function MediumIcon({className, children, ...props}) {
    return (
        <Icon
            className={['icon--medium__container', className].join(' ')} {...props}>
            {children}
        </Icon>
    )
}