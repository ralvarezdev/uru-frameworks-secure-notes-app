import './Form.css'
import {useFetcher} from "react-router-dom";

// Form component
function Form({className, children, ...props}) {
    const fetcher = useFetcher();

    return (
        <fetcher.Form className={['form', className].join(' ')} {...props}>
            {children}
        </fetcher.Form>
    )
}

export default Form;