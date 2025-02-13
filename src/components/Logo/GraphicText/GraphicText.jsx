import './GraphicText.css'

// Graphic text logo component
export default function GraphicTextLogo({className, children, ...props}) {
    return (
        <div
            className={['logo--graphic-text__container', className].join(' ')} {...props}>
            <img className='logo--graphic-text__svg'
                 src="/secure-notes--graphic-with-text.svg"
                 alt="Secure Notes Graphic with Info SVG"/>
            {children}
        </div>
    )
}