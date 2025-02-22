import MediumIcon from "../../../../Icon/Medium/Medium.jsx";
import TransparentButton from "../../Transparent.jsx";

// Transparent medium icon button component
export default function TransparentMediumIconButton({
                                                        className,
                                                        children,
                                                        ...props
                                                    }) {
    return (
        <TransparentButton className={className} {...props}>
            <MediumIcon>
                {children}
            </MediumIcon>
        </TransparentButton>
    )
}