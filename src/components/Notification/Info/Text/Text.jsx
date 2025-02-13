import './Text.css'
import MemoizedInfoNotification from "../InfoMemo.jsx";
import SmallText from "../../../Text/Small/Small.jsx";

// Info text notification component
export default function InfoTextNotification({className, children, ...props}) {
    return (
        <MemoizedInfoNotification {...props}>
            <SmallText
                className={['notification__main-container--info__content-container__content__text', className].join(' ')}>
                {children}
            </SmallText>
        </MemoizedInfoNotification>
    )
}