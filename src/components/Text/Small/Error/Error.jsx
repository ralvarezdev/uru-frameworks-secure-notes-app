import './Error.css'
import SmallText from "../Small.jsx";

// Error small text component
export default function ErrorSmallText({active, children}) {
    return (
        <SmallText
            className={['text--small--error', active ? 'text--small--error--active' : ''].join(' ')}>
            {children}
        </SmallText>
    )
}