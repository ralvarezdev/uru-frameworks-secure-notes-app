import './Text.css'
import MemoizedErrorNotification from "../ErrorMemo.jsx";
import SmallText from "../../../Text/Small/Small.jsx";

// Error text notification component
export default function ErrorTextNotification({className, children, ...props}) {
    return (
        <MemoizedErrorNotification {...props}>
            <SmallText
                className={['notification__main-container--error__content-container__content__text', className].join(' ')}>
                {children}
            </SmallText>
        </MemoizedErrorNotification>
    )
}