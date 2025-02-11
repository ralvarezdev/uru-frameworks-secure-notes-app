import './App.css'
import { useNotification } from '../../context/Notification.jsx';
import ErrorNotification from "../../components/Notification/Error/Error.jsx";
import InfoNotification from "../../components/Notification/Info/Info.jsx";
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
                        className={['notification-container', index === notifications.length - 1 ? 'new-notification-container' : ''].join(' ')}
                    >
                        {notification?.type==='error' ? (
                            <ErrorNotification
                                duration={NOTIFICATION_DURATION}
                                animationDuration={ANIMATION_FADE_DURATION}
                                onAnimationEnd={() => removeNotification(notification.id)}
                                key={index}
                                onClose={() => removeNotification(notification.id)}
                            >
                                {notification.message}
                            </ErrorNotification>
                        ) : null}
                        {notification?.type==='info' ? (
                            <InfoNotification
                                key={index}
                                onClose={() => removeNotification(notification.id)}
                            >
                                {notification.message}
                            </InfoNotification>
                        ) : null
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}