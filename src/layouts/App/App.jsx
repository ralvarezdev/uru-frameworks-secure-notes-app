import './App.css'
import { useNotification } from '../../context/Notification.jsx';
import NotificationError from "../../components/Notification/Error/Error.jsx";
import NotificationInfo from "../../components/Notification/Info/Info.jsx";

// App layout
export default function App({children}) {
    const { notifications } = useNotification();

    return (
        <div className='app-container'>
            <div className={'app-notification-container'}>
                {notifications.map((notification, index) => (
                    <div
                        key={index}
                        className={`notification-container ${index === notifications.length-1 ? 'new-notification-container' : ''}`}
                    >
                        {notification?.error ? (
                            <NotificationError
                                key={index}
                                className='notification'
                                onClose={() => removeNotification(index)}
                            >
                                {notification.error}
                            </NotificationError>
                        ) : null}
                        {notification?.info ? (
                            <NotificationInfo
                                key={index}
                                className='notification'
                                onClose={() => removeNotification(index)}
                            >
                                {notification.info}
                            </NotificationInfo>
                        ) : null
                        }
                    </div>
                ))}
            </div>
            {children}
        </div>
    )
}