import './Transparent.css'
import Button from "../Button.jsx";

// Transparent button component
export default function Transparent({className, ...props}) {
    return (
        <Button
            className={['transparent', 'text', className].join(' ')} {...props}/>
    )
}