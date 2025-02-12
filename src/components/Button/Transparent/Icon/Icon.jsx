import './Icon.css'
import Icon from "../../../Icon/Icon.jsx";
import TransparentButton from "../Transparent.jsx";

// Transparent icon button component
export default function ButtonTransparentIcon({className, children, ...props}) {
    return (
        <TransparentButton className={className} {...props}>
            <Icon>
                {children}
            </Icon>
        </TransparentButton>
    )
}