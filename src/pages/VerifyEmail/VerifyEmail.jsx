import {useLocation, useNavigate} from "react-router-dom";
import ParagraphText from "../../components/Text/Paragraph/Paragraph.jsx";
import {sendRequest} from "../../utils/api.js";
import {useQuery} from "react-query";
import {useCallback, useEffect} from "react";
import {REDIRECT_DURATION} from "../../constants.js";
import {useAuth} from "../../context/Auth.jsx";
import ModalLayout from "../../layouts/Modal/Modal.jsx";
import {useTimer} from "../../hooks/timer.jsx";
import {DASHBOARD, LOG_IN} from "../../endpoints.js";

// Verify email request handler
export async function VerifyEmailHandleRequest(token) {
    // Send the request to the API
    const [, response] = await sendRequest('POST', '/auth/email/verify', {
        token
    });

    // Check if the email was verified successfully
    if (response?.status !== 'error')
        return {...response};

    throw new Error(response?.message)
}

// Verify email page
export default function VerifyEmail() {
    const location = useLocation();
    const token = location.pathname.split('/')[2];
    const {
        data,
        isLoading,
        error
    } = useQuery(['verify-email', token], () => VerifyEmailHandleRequest(token));
    const {isAuth} = useAuth();
    const navigate = useNavigate();
    const {redirectIn, setIsActive} = useTimer({
        onTimerEnd: useCallback(() => {
            if (isAuth) navigate(DASHBOARD);
            else navigate(LOG_IN);
        }, [navigate, isAuth]),
        timerDuration: REDIRECT_DURATION,
        timerInterval: 1000,
    })

    // Handle on loaded
    useEffect(() => {
        if (isLoading) return;

        // Set the active state of the timer
        setIsActive(true);
    }, [setIsActive, isLoading]);

    return (
        <ModalLayout title='Email Verification'>
            {isLoading && <ParagraphText>Loading...</ParagraphText>}
            {!isLoading && error && (
                <ParagraphText>
                    {error.message[0].charAt(0).toUpperCase() + error.message.slice(1)}
                </ParagraphText>
            )}
            {!isLoading && data?.status === 'fail' && (
                <ParagraphText>
                    {data?.data?.token?.[0].charAt(0).toUpperCase() + data?.data?.token?.[0].slice(1)}
                </ParagraphText>
            )}
            {!isLoading && data?.status === 'success' && (
                <ParagraphText>
                    Your email has been verified successfully!
                </ParagraphText>
            )}
            {!isLoading && (
                <ParagraphText>
                    {`Redirecting to the ${isAuth ? 'dashboard' : 'login'} page in ${redirectIn} seconds...`}
                </ParagraphText>
            )}
        </ModalLayout>
    )
}