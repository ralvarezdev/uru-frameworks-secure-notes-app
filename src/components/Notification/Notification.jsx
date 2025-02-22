import './Notification.css'
import MemoizedFadeOut from "../FadeOut/FadeOutMemo.jsx";
import TransparentMediumIconButton
    from "../Button/Transparent/Icon/Medium/Medium.jsx";
import {useCallback, useState} from "react";
import {useNotification} from "../../context/Notification.jsx";

// Notification component
export default function Notification({
                                         className,
                                         children,
                                         notificationID,
                                         ...props
                                     }) {
    const [isInterrupted, setInterrupted] = useState(false);
    const {removeNotification} = useNotification();

    // Handle remove notification
    const handleRemove = useCallback(() => {
        removeNotification(notificationID);
    }, [removeNotification, notificationID]);


    // Handle close notification
    const handleClose = useCallback(() => {
        setInterrupted(true);
    }, []);

    return (
        <MemoizedFadeOut interrupt={isInterrupted}
                         onAnimationEnd={handleRemove} {...props}>
            <div
                className={['notification__main-container', className].join(' ')}>
                <div
                    className='notification__main-container__content-container'>
                    <div
                        className="notification__main-container__content-container__close-container">
                        <TransparentMediumIconButton
                            className='notification__main-container__content-container__close-container__button'
                            onClick={handleClose}>close
                        </TransparentMediumIconButton>
                    </div>
                    <div
                        className='notification__main-container__content-container__content'>
                        {children}
                    </div>
                </div>
            </div>
        </MemoizedFadeOut>
    )
}
