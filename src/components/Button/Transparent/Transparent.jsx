import './Transparent.css'
import Button from "../Button.jsx";

// Transparent button component
export default function ButtonTransparent({className, ...props}) {
    return (
        <Button
            className={['button--transparent', className].join(' ')} {...props}/>
    )
}