import './Subtitle.css'

// Subheader text component
export default function SubtitleText({className, children, ...props}) {
    return (
        <h2 className={['text--subtitle', className].join(' ')} {...props}>
            {children}
        </h2>
    )
}