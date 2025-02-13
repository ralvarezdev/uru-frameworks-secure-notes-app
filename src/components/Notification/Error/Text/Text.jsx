import './Text.css'
import ErrorNotification from "../Error.jsx";
import SmallText from "../../../Text/Small/Small.jsx";

// Error text notification component
export default function ErrorTextNotification({className, children, ...props}) {
    return (
        <ErrorNotification {...props}>
            <SmallText
                className={['notification__main-container--error__content-container__content__text', className].join(' ')}>
                {children}
            </SmallText>
        </ErrorNotification>
    )
}