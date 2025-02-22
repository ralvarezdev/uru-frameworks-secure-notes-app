import BigIcon from "../../../../Icon/Big/Big.jsx";
import TransparentButton from "../../Transparent.jsx";

// Transparent big icon button component
export default function TransparentBigIconButton({
                                                     className,
                                                     children,
                                                     ...props
                                                 }) {
    return (
        <TransparentButton className={className} {...props}>
            <BigIcon>
                {children}
            </BigIcon>
        </TransparentButton>
    )
}