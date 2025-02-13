import './Paragraph.css'

// Paragraph text component
export default function ParagraphText({className, children, ...props}) {
    return (
        <p className={['text--paragraph', className].join(' ')} {...props}>
            {children}
        </p>
    )
}