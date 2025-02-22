import './Secondary.css'
import Button from "../Button.jsx";

// Secondary button component
export default function SecondaryButton({className, ...props}) {
    return (
        <Button
            className={['button--secondary', className].join(' ')} {...props}/>
    )
}