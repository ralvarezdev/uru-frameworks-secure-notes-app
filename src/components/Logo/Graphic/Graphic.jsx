import './Graphic.css'

// Graphic component
export default function Graphic({className, children, ...props}) {
    return (
        <div className={['graphic', className].join(' ')} {...props}>
            <img className='graphic__svg' src="/secure-notes--graphic.svg"
                 alt="Secure Notes Graphic SVG"/>
            {children}
        </div>
    )
}
