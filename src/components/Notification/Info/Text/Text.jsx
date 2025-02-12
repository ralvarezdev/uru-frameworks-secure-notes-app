import './Text.css'
import Text from "../../../Text/Text.jsx";
import NotificationInfo from "../Info.jsx";

// Notification info text component
export default function NotificationInfoText({className, children, ...props}) {
    return (
        <NotificationInfo {...props}>
            <Text className={['notification--info__text', className].join(' ')}>
                {children}
            </Text>
        </NotificationInfo>
    )
}