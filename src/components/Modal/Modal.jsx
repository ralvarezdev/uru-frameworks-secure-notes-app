import './Modal.css'
import Button from "../Button/Button.jsx";
import TransparentIconButton from "../Button/Transparent/Icon/Icon.jsx";
import {useCallback} from "react";

// Modal component
export default function Modal({id, children, className, closable, ...props}) {
    // Close handler
    const handleClose = useCallback(() => {
        // Remove the modal
        document.querySelector(`#${id}`).remove();
    }, []);

    return (
        <div id={id} className='modal'>
            <div className='modal__overlay'>
            </div>
            <div
                className={'modal__content-container'} {...props}>
                <div
                className={['modal__content-container__content', className].join(' ')} {...props}>
                {closable && (
                    <div className='modal__content-container__content__close-container'>
                        <TransparentIconButton
                            className='modal__content-container__content__close-container__close-button'
                            onClick={handleClose}>
                            close
                        </TransparentIconButton>
                    </div>
                )}
                {children}
            </div>
            </div>
        </div>
    )
}