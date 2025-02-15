import './App.css'
import {useNotification} from '../../context/Notification.jsx';
import MemoizedErrorTextNotification
    from "../../components/Notification/Error/Text/TextMemo.jsx";
import MemoizedInfoTextNotification
    from "../../components/Notification/Info/Text/TextMemo.jsx";
import {
    ANIMATION_FADE_DURATION,
    NOTIFICATION_DURATION
} from "../../constants.js";

// App layout
export default function App({children}) {
    const {notifications} = useNotification();

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
                                <MemoizedErrorTextNotification
                                    key={notification.id}
                                    duration={NOTIFICATION_DURATION}
                                    animationDuration={ANIMATION_FADE_DURATION}
                                    notificationID={notification.id}
                                >
                                    {notification.message}
                                </MemoizedErrorTextNotification>
                            ) : null}
                            {notification?.type === 'info' ? (
                                <MemoizedInfoTextNotification
                                    key={notification.id}
                                    duration={NOTIFICATION_DURATION}
                                    animationDuration={ANIMATION_FADE_DURATION}
                                    notificationID={notification.id}
                                >
                                    {notification.message}
                                </MemoizedInfoTextNotification>
                            ) : null}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}