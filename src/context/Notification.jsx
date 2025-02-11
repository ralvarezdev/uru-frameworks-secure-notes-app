import { createContext, useState, useContext } from 'react';

// Create a context
const NotificationContext = createContext();

// Create a provider
export function NotificationProvider({ children }) {
    const [notificationID, setNotificationID] = useState(0);
    const [notifications, setNotifications] = useState([]);

    // Increment the notification ID
    const incrementNotificationID = () => {
        setNotificationID((prevNotificationID) => prevNotificationID + 1);
    };

    // Add a notification to the list
    const addNotification = (notification) => {
        // Add the notification to the list
        setNotifications((prevNotifications) => [...prevNotifications, {notification, id: notificationID}]);

        // Increment the notification ID
        incrementNotificationID();
    };

    // Add error notification to the list
    const addErrorNotification = (message) => {
        addNotification({type: 'error', message});
    }

    // Add info notification to the list
    const addInfoNotification = (message) => {
        addNotification({type: 'info', message});
    }

    // Clear the notifications
    const clearNotifications = () => {
        setNotifications([]);
    };

    // Remove a notification from the list
    const removeNotification = (id) => {
        setNotifications((prevNotifications) => prevNotifications.filter((notification) => notification.id !== id));
    };

    return (
    <NotificationContext.Provider value={{ notifications, addNotification, addErrorNotification, addInfoNotification, removeNotification, clearNotifications }}>
        {children}
        </NotificationContext.Provider>
    );
}

// Custom hook that shorthands the context
export function useNotification() {
    return useContext(NotificationContext);
}