import './CallToAction.css'
import {useCallback} from "react";
import PrimaryButton from "../Button/Primary/Primary.jsx";

// Call to action component
export default function CallToAction({
                                         className,
                                         children,
                                         isOnError,
                                         setIsOnError,
                                         onSubmit,
                                         isSubmitting,
                                         ...props
                                     }) {
    // Handle the form submit
    const handleSubmit = useCallback(() => {
        onSubmit()
    }, [onSubmit]);

    return (
        <div className={['cta__container', className].join(' ')} {...props}>
            {children}
            <PrimaryButton
                className='cta__container__submit-button'
                onClick={handleSubmit}
                disabled={isSubmitting ? true : null}>
                {isSubmitting ? 'Submitting...' : 'Continue'}
            </PrimaryButton>
        </div>
    )
}