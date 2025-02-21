import {useAuth} from "../../context/Auth.jsx";
import {useCallback, useEffect} from "react";
import {REDIRECT_DURATION} from "../../constants.js";
import ParagraphText from "../../components/Text/Paragraph/Paragraph.jsx";
import ModalLayout from "../../layouts/Modal/Modal.jsx";
import {useTimer} from "../../hooks/timer.jsx";
import {DASHBOARD, LOG_IN} from "../../endpoints.js";

// Not found page
export default function NotFound() {
    const {isAuth} = useAuth();
    const {redirectIn, setIsActive} = useTimer({
        onTimerEnd: useCallback(() => {
            window.location.href = isAuth ? DASHBOARD : LOG_IN;
        }, [isAuth]),
        timerDuration: REDIRECT_DURATION,
        timerInterval: 1000,
    })

    // Handle on loaded
    useEffect(() => {
        setIsActive(true);
    }, [setIsActive]);

    return (
        <ModalLayout title='Page Not Found'>
            <ParagraphText>
                The page you are looking for does not exist.
            </ParagraphText>
            <ParagraphText>
                {`Redirecting to the ${isAuth ? 'dashboard' : 'login'} page in ${redirectIn} seconds...`}
            </ParagraphText>
        </ModalLayout>
    )
}
