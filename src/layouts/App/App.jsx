import './App.css'
import {useNotification} from '../../context/Notification.jsx';
import ErrorTextNotification
    from "../../components/Notification/Error/Text/Text.jsx";
import InfoTextNotification
    from "../../components/Notification/Info/Text/Text.jsx";
import {
    ANIMATION_FADE_DURATION,
    NOTIFICATION_DURATION
} from "../../constants.js";
import {useCallback} from "react";

// App layout
export default function App({children}) {
    const {notifications, removeNotification} = useNotification();

    // Handle remove notification
    const handleRemoveNotification = useCallback((id) => {
        removeNotification(id);
    }, [removeNotification]);

    return (
        <div className='app__main-container'>
            {children}
            <div
                className='app__main-container__notifications-container--relative'>
                <div
                    className='app__main-container__notifications-container--absolute'>
                    {notifications.map((notification) => (
                        <div key={notification.id}
                             className='app__main-container__notifications-container--absolute__item'>
                            {notification?.type === 'error' ? (
                                <ErrorTextNotification
                                    key={notification.id}
                                    duration={NOTIFICATION_DURATION}
                                    animationDuration={ANIMATION_FADE_DURATION}
                                    onAnimationEnd={() => handleRemoveNotification(notification.id)}
                                    onClose={() => handleRemoveNotification(notification.id)}
                                >
                                    {notification.message + ' ' + notification.id}
                                </ErrorTextNotification>
                            ) : null}
                            {notification?.type === 'info' ? (
                                <InfoTextNotification
                                    key={notification.id}
                                    duration={NOTIFICATION_DURATION}
                                    animationDuration={ANIMATION_FADE_DURATION}
                                    onAnimationEnd={() => handleRemoveNotification(notification.id)}
                                    onClose={() => handleRemoveNotification(notification.id)}
                                >
                                    {notification.message}
                                </InfoTextNotification>
                            ) : null}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}