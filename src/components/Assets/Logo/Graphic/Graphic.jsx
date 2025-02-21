import './Graphic.css'

// Graphic logo asset component
export default function GraphicLogoAsset({className, ...props}) {
    return (
        <div
            className={['asset--logo--graphic__container', className].join(' ')} {...props}>
            <img className='asset--logo--graphic__container__svg'
                 src="/secure-notes--graphic.svg"
                 alt="Secure Notes Graphic SVG" loading='lazy'/>
        </div>
    )
}
