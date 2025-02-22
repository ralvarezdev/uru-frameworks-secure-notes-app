import './Modal.css'
import TransparentIconButton from "../Button/Transparent/Icon/Icon.jsx";

// Modal component
export default function Modal({children, className, onClose, ...props}) {
    return (
        <div className='modal'>
            <div className='modal__overlay'>
            </div>
            <div
                className={'modal__content-container'} {...props}>
                <div
                className={['modal__content-container__content', className].join(' ')} {...props}>
                {onClose && (
                    <div className='modal__content-container__content__close-container'>
                        <TransparentIconButton
                            className='modal__content-container__content__close-container__close-button'
                            onClick={onClose}>
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