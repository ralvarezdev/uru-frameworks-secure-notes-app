import './Text.css'
import Text from "../../../Text/Text.jsx";
import NotificationError from "../Error.jsx";

// Notification error text component
export default function NotificationErrorText({className, children, ...props}) {
    return (
        <NotificationError {...props}>
            <Text
                className={['notification--error__text', className].join(' ')}>
                {children}
            </Text>
        </NotificationError>
    )
}