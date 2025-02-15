import './Form.css'
import {Form as FormRouter, useActionData, useSubmit} from "react-router-dom";
import {useCallback, useEffect, useRef, useState} from "react";
import PrimaryButton from "../Button/Primary/Primary.jsx";

// Form component
export default function Form({className, children, isOnError, setOnError, ...props}) {
    const actionData = useActionData()
    const submit = useSubmit()
    const [isSubmitting, setIsSubmitting] = useState(false);
    const formRef = useRef(null);

    // Handle the form submit
    const handleSubmit = useCallback(() => {
        // Check the form validity
        if (formRef.current.checkValidity()) {
            setIsSubmitting(true);
            submit(formRef.current)
        }
    }, [submit, setIsSubmitting]);

    // Handle the form change
    const handleChange = useCallback(() => {
        setOnError((prevIsOnError) => {
            if (prevIsOnError) return false;
            return prevIsOnError;
        });
    }, [setOnError]);

    // Handle the form submit
    useEffect(() => {
        setIsSubmitting(false);
    }, [actionData, setIsSubmitting]);

    return (
        <FormRouter ref={formRef}
                    className={['form', className].join(' ')} onChange={handleChange} {...props}>
            {children}
            <PrimaryButton
                className='form__submit-button'
                onClick={handleSubmit}
                disabled={isSubmitting ? true : null}>
                {isSubmitting ? 'Submitting...' : 'Continue'}
            </PrimaryButton>
        </FormRouter>
    )
}