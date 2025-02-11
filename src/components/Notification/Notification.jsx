import './Notification.css'
import FadeOutComponent from "../FadeOut/FadeOut.jsx";
import TransparentIconButton from "../Button/Transparent/Icon/Icon.jsx";
import {useCallback, useState} from "react";
import {ANIMATION_FADE_DURATION} from "../../constants.js";

// Notification component
export default function Notification({className, children, onClose, ...props}) {
    const [isClosing, setIsClosing] = useState(false);

    // Close the notification handler
    const closeNotification = useCallback(() => {
        console.log('closeNotification');
        setIsClosing(true);
        setTimeout(onClose, ANIMATION_FADE_DURATION);
    }, [onClose]);

    return (
        <FadeOutComponent interrupt={isClosing} {...props}>
            <div className={['notification', className].join(' ')}>
                <div className="notification__close-container">
                   <TransparentIconButton className='notification__close-button' onClick={closeNotification}>close
                    </TransparentIconButton>
                </div>
                {children}
            </div>
        </FadeOutComponent>
    )
}
