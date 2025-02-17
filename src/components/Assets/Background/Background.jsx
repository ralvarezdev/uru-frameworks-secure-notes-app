import './Background.css'

// Background asset component
export default function BackgroundAsset({className, children, ...props}) {
    return (
        <div
            className={['asset--background__container', className].join(' ')} {...props}>
            <img className='asset--background__container__image'
                 src="/key--1980x1114.webp"
                 alt="Secure Notes Background SVG" loading='lazy'/>
            {children}
        </div>
    )
}