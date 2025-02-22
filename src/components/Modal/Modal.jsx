import './Modal.css'
import Button from "../Button/Button.jsx";
import TransparentIconButton from "../Button/Transparent/Icon/Icon.jsx";

// Modal component
export default function Modal({children, className, closable, ...props}) {
    return (
        <>
            <div className='modal__overlay'>
            </div>
            <div
                className={['modal__content-container', className].join(' ')} {...props}>
                {closable && (
                    <div className='modal__content-container__close-container'>
                        <TransparentIconButton
                            className='modal__content-container__close-container__close-button'
                            onClick={() => window.history.back()}>
                            close
                        </TransparentIconButton>
                    </div>
                )}
                {children}
            </div>
        </>
    )
}