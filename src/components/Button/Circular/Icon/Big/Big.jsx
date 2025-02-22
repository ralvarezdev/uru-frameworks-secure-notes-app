import BigIcon from "../../../../Icon/Big/Big.jsx";
import CircularButton from "../../Circular.jsx";

// Circular big icon button component
export default function CircularBigIconButton({className, children, ...props}) {
    return (
        <CircularButton className={className} {...props}>
            <BigIcon>
                {children}
            </BigIcon>
        </CircularButton>
    )
}