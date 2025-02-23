import SmallIcon from "../../../../Icon/Small/Small.jsx";
import TransparentButton from "../../Transparent.jsx";

// Transparent small icon button component
export default function TransparentSmallIconButton({
                                                        className,
                                                        children,
                                                        ...props
                                                    }) {
    return (
        <TransparentButton className={className} {...props}>
            <SmallIcon>
                {children}
            </SmallIcon>
        </TransparentButton>
    )
}