import './GraphicText.css'

// GraphicText component
export default function GraphicText({className, children, ...props}) {
    return (
        <div className={['graphic-text', className].join(' ')} {...props}>
            <img className='graphic-text__svg'
                 src="/secure-notes--graphic-with-text.svg"
                 alt="Secure Notes Graphic with Info SVG"/>
            {children}
        </div>
    )
}