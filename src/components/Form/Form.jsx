import './Form.css'
import {Form as FormRouter} from "react-router-dom";
import {useCallback, useRef} from "react";
import PrimaryButton from "../Button/Primary/Primary.jsx";

// Form component
export default function Form({
                                 className,
                                 children,
                                 isOnError,
                                 setOnError,
                                 onSubmit,
                                 isSubmitting,
                                 ...props
                             }) {
    const formRef = useRef(null);

    // Handle the form submit
    const handleSubmit = useCallback((event) => {
        // Prevent the default form submission
        event.preventDefault()

        // Check the form validity
        if (formRef.current.checkValidity()) {
            const formData = new FormData(formRef.current);
            onSubmit(formData)
        }
    }, [onSubmit]);

    // Handle the form change
    const handleChange = useCallback(() => {
        setOnError((prevIsOnError) => {
            if (prevIsOnError) return false;
            return prevIsOnError;
        });
    }, [setOnError]);

    return (
        <FormRouter ref={formRef}
                    className={['form__container', className].join(' ')}
                    onChange={handleChange} {...props}>
            {children}
            <PrimaryButton
                className='form__container__submit-button'
                onClick={handleSubmit}
                disabled={isSubmitting ? true : null}>
                {isSubmitting ? 'Submitting...' : 'Continue'}
            </PrimaryButton>
        </FormRouter>
    )
}