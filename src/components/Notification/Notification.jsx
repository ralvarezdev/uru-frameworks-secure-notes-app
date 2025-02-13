import './Notification.css'
import FadeOutComponent from "../FadeOut/FadeOut.jsx";
import TransparentIconButton from "../Button/Transparent/Icon/Icon.jsx";
import {useCallback, useState} from "react";
import {ANIMATION_FADE_DURATION} from "../../constants.js";

// Notification component
export default function Notification({
                                         className,
                                         children,
                                         onAnimationEnd,
                                         ...props
                                     }) {
    const [isInterrupted, setInterrupted] = useState(false);

    // Close the notification handler
    const closeNotification = useCallback(() => {
        setInterrupted(true);
        setTimeout(onAnimationEnd, ANIMATION_FADE_DURATION);
    }, [onAnimationEnd]);

    return (
        <FadeOutComponent interrupt={isInterrupted}
                          onAnimationEnd={onAnimationEnd} {...props}>
            <div
                className={['notification__main-container', className].join(' ')}>
                <div
                    className='notification__main-container__content-container'>
                    <div
                        className="notification__main-container__close-container">
                        <TransparentIconButton
                            className='notification__main-container__close-container__button'
                            onClick={closeNotification}>close
                        </TransparentIconButton>
                    </div>
                    <div className='notification__main-container__content'>
                        {children}
                    </div>
                </div>
            </div>
        </FadeOutComponent>
    )
}
