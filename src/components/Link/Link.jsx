import {Link as RouterLink} from "react-router-dom";
import ParagraphText from "../Text/Paragraph/Paragraph.jsx";
import './Link.css'

// Link component
export default function Link({className, to, children, ...props}) {
    return (
        <RouterLink to={to}>
            <ParagraphText
                className={['link__text', className].join(' ')} {...props}>{children}</ParagraphText>
        </RouterLink>
    )
}
