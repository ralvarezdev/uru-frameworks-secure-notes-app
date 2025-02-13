import './Graphic.css'

// Graphic logo component
export default function GraphicLogo({className, children, ...props}) {
    return (
        <div
            className={['logo--graphic__container', className].join(' ')} {...props}>
            <img className='logo--graphic__svg' src="/secure-notes--graphic.svg"
                 alt="Secure Notes Graphic SVG"/>
            {children}
        </div>
    )
}
