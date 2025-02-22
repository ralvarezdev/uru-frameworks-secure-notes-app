import './Modal.css'
import TransparentIconButton from "../Button/Transparent/Icon/Big/Big.jsx";
import Separator from "../Separator/Separator.jsx";

// Modal component
export default function Modal({
                                  header,
                                  children,
                                  className,
                                  onClose,
                                  ...props
                              }) {
    return (
        <div className='modal'>
            <div className='modal__overlay'>
            </div>
            <div
                className={'modal__content-container'} {...props}>
                {onClose && (
                    <div
                        className='modal__content-container__content__close-container'>
                        <TransparentIconButton
                            className='modal__content-container__content__close-container__close-button'
                            onClick={onClose}>
                            close
                        </TransparentIconButton>
                    </div>
                )}
                <div
                    className={['modal__content-container__content', className].join(' ')} {...props}>
                    <div
                        className='modal__content-container__content__header-container'>
                        <div
                            className='modal__content-container__content__header-container__header'>{header}</div>
                        <Separator
                            className='modal__content-container__content__header-container__separator'/>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}