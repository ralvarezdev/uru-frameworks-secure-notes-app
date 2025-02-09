import './Primary.css'
import Button from "../Button.jsx";

// Primary button component
function Primary({className, ...props}) {
    return (
        <Button
            className={['primary', 'text', className].join(' ')} {...props}/>
    )
}

export default Primary;