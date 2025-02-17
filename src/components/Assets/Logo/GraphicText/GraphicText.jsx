import './GraphicText.css'

// Graphic text logo asset component
export default function GraphicTextLogoAsset({className, children, ...props}) {
    return (
        <div
            className={['asset--logo--graphic-text__container', className].join(' ')} {...props}>
            <img className='asset--logo--graphic-text__container__svg'
                 src="/secure-notes--graphic-with-text.svg"
                 alt="Secure Notes Graphic with Info SVG" loading='lazy'/>
            {children}
        </div>
    )
}