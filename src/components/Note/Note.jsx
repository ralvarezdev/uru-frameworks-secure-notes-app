import './Note.css'
import ParagraphText from "../Text/Paragraph/Paragraph.jsx";

// Note component
export default function Note({color, title, children, className, content, ...props}) {
    return (
        <div className={['note__main-container', className].join(' ')}
             style={{outlineColor: color}}{...props}>
            <div className='note__main-container__header-container'>
                <div
                    className='note__main-container__header-container__header'>
                    <ParagraphText>{title}</ParagraphText>
                </div>
            </div>
            <div className='note__main-container__content'>
                {children}
            </div>
        </div>
    )
}