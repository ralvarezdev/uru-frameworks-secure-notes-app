import './Primary.css'
import Button from "../Button.jsx";

// Primary button component
export default function Primary({className, ...props}) {
    return (
        <Button
            className={['primary', 'label-text', className].join(' ')} {...props}/>
    )
}