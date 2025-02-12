import './App.css'
import {useNotification} from '../../context/Notification.jsx';
import NotificationErrorText
    from "../../components/Notification/Error/Text/Text.jsx";
import NotificationInfoText
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
        <div className='app-container'>
            {children}
            <div className='notifications-container--relative'>
                <div className='notifications-container--absolute'>
                    {notifications.map((notification, index) => (
                        <>
                            {notification?.type === 'error' ? (
                                <NotificationErrorText
                                    key={notification.id}
                                    className={index === notifications.length - 1 && 'notification-container--new'}
                                    duration={NOTIFICATION_DURATION}
                                    animationDuration={ANIMATION_FADE_DURATION}
                                    onAnimationEnd={() => handleRemoveNotification(notification.id)}
                                    onClose={() => handleRemoveNotification(notification.id)}
                                >
                                    {notification.message + ' ' + notification.id}
                                </NotificationErrorText>
                            ) : null}
                            {notification?.type === 'info' ? (
                                <NotificationInfoText
                                    key={notification.id}
                                    className={index === notifications.length - 1 && 'notification-container--new'}
                                    duration={NOTIFICATION_DURATION}
                                    animationDuration={ANIMATION_FADE_DURATION}
                                    onAnimationEnd={() => handleRemoveNotification(notification.id)}
                                    onClose={() => handleRemoveNotification(notification.id)}
                                >
                                    {notification.message}
                                </NotificationInfoText>
                            ) : null}
                        </>
                    ))}
                </div>
            </div>
        </div>
    )
}