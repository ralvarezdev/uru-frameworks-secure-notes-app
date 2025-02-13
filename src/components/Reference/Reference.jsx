import './Reference.css'
import ParagraphText from "../Text/Paragraph/Paragraph.jsx";
import Link from "../Link/Link.jsx";

// Reference component
export default function Reference({className, children, to, text, ...props}) {
    return (
        <div className='reference__container'>
            {text && <ParagraphText>{text}</ParagraphText>}
            <Link className={className} to={to} {...props}>{children}</Link>
        </div>
    )
}
