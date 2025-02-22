import SmallIcon from "../../../../Icon/Small/Small.jsx";
import CircularButton from "../../Circular.jsx";

// Circular small icon button component
export default function CircularSmallIconButton({
                                                    className,
                                                    children,
                                                    ...props
                                                }) {
    return (
        <CircularButton className={className} {...props}>
            <SmallIcon>
                {children}
            </SmallIcon>
        </CircularButton>
    )
}