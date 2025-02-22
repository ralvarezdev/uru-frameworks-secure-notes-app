import './Circular.css'
import Button from "../Button.jsx";

// Circular button component
export default function CircularButton({className, ...props}) {
    return (
        <Button
            className={['button--circular', className].join(' ')} {...props}/>
    )
}