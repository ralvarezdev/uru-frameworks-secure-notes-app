import {createContext, useState, useContext, useCallback} from 'react';

// Create a context
const NotificationContext = createContext();

// Create a provider
export default function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);

    // Add a notification to the list
    const addNotification = useCallback((notification) => {
        // Add the notification to the list
        setNotifications((prevNotifications) => [...prevNotifications, {...notification, id: prevNotifications.length===0 ? 1 : prevNotifications[prevNotifications.length-1].id+1}]);
    }, []);

    // Add error notification to the list
    const addErrorNotification = useCallback((message) => {
        addNotification({type: 'error', message});
    }, [addNotification]);

    // Add info notification to the list
    const addInfoNotification = useCallback((message) => {
        addNotification({type: 'info', message});
    }, [addNotification]);

    // Clear the notifications
    const clearNotifications = useCallback(() => {
        setNotifications([]);
    }, []);

    // Remove a notification from the list
    const removeNotification = useCallback((id) => {
        setNotifications((prevNotifications) => prevNotifications.filter((notification) => notification.id !== id));
    }, []);

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