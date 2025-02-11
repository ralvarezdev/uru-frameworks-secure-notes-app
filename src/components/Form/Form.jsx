import './Form.css'
import {Form as FormRouter} from "react-router-dom";

// Form component
export default function Form({className, children, ...props}) {
    return (
        <FormRouter className={['form', className].join(' ')} {...props}>
            {children}
        </FormRouter>
    )
}
