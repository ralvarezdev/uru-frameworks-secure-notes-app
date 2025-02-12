import './Primary.css'
import Button from "../Button.jsx";

// Primary button component
export default function ButtonPrimary({className, ...props}) {
    return (
        <Button
            className={['button--primary', className].join(' ')} {...props}/>
    )
}