import Icon from "../../../Icon/Icon.jsx";
import CircularButton from "../Circular.jsx";

// Circular icon button component
export default function CircularIconButton({className, children, ...props}) {
    return (
        <CircularButton className={className} {...props}>
            <Icon>
                {children}
            </Icon>
        </CircularButton>
    )
}