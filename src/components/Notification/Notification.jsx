import './Notification.css'
import FadeOutComponent from "../FadeOut/FadeOut.jsx";
import ButtonTransparentIcon from "../Button/Transparent/Icon/Icon.jsx";
import {useCallback, useState} from "react";
import {ANIMATION_FADE_DURATION} from "../../constants.js";

// Notification component
export default function Notification({className, children, onClose, ...props}) {
    const [isClosing, setIsClosing] = useState(false);

    // Close the notification handler
    const closeNotification = useCallback(() => {
        setIsClosing(true);
        setTimeout(onClose, ANIMATION_FADE_DURATION);
    }, [onClose]);

    return (
        <FadeOutComponent interrupt={isClosing} {...props}>
            <div className={['notification-container', className].join(' ')}>
                <div className="notification__close-container">
                   <ButtonTransparentIcon className='notification__close-button' onClick={closeNotification}>close
                    </ButtonTransparentIcon>
                </div>
                <div className='notification__content'>
                    {children}
                </div>
            </div>
        </FadeOutComponent>
    )
}
