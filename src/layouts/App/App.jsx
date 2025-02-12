import './App.css'
import { useNotification } from '../../context/Notification.jsx';
import NotificationErrorText from "../../components/Notification/Error/Text/Text.jsx";
import NotificationInfoText from "../../components/Notification/Info/Text/Text.jsx";
import {
    ANIMATION_FADE_DURATION,
    NOTIFICATION_DURATION
} from "../../constants.js";

// App layout
export default function App({children}) {
    const { notifications, removeNotification } = useNotification();

    return (
        <div className='app-container'>
            {children}
            <div className={'notifications-container'}>
                {notifications.map((notification, index) => (
                    <div
                        key={index}
                        className={index === notifications.length - 1 && 'new-notification-container'}
                    >
                        {notification?.type==='error' ? (
                            <NotificationErrorText
                                duration={NOTIFICATION_DURATION}
                                animationDuration={ANIMATION_FADE_DURATION}
                                onAnimationEnd={() => removeNotification(notification.id)}
                                key={index}
                                onClose={() => removeNotification(notification.id)}
                            >
                                {notification.message + ' ' + notification.id}
                            </NotificationErrorText>
                        ) : null}
                        {notification?.type==='info' ? (
                            <NotificationInfoText
                                duration={NOTIFICATION_DURATION}
                                animationDuration={ANIMATION_FADE_DURATION}
                                onAnimationEnd={() => removeNotification(notification.id)}
                                key={index}
                                onClose={() => removeNotification(notification.id)}
                            >
                                {notification.message}
                            </NotificationInfoText>
                        ) : null
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}