import './VerifyEmail.css'
import {useLocation} from "react-router-dom";
import TitleText from "../../components/Text/Title/Title.jsx";
import ParagraphText from "../../components/Text/Paragraph/Paragraph.jsx";
import GraphicTextLogo from "../../components/Logo/GraphicText/GraphicText.jsx";
import GraphicLogo from "../../components/Logo/Graphic/Graphic.jsx";
import Separator from "../../components/Separator/Separator.jsx";
import {sendRequest} from "../../utils/api.js";
import {useQuery} from "react-query";

// Verify email request handler
export async function VerifyEmailHandleRequest(token) {
    // Send the request to the API
    const [, response] = await sendRequest('POST', '/auth/email/verify', {
        token
    });

    // Check if the email was verified successfully
    if (response?.status === 'success')
        return null;
    if (response?.status === 'fail')
        throw new Error(response?.data?.token?.[0])
    throw new Error(response?.message)
}


// Verify email page
export default function VerifyEmail() {
    const location = useLocation();
    const token = location.pathname.split('/')[2];
    const {
        isLoading,
        error
    } = useQuery(['verify-email', token], () => VerifyEmailHandleRequest(token));

    return (
        <div className='verify-email__main-container'>
            <div className='verify-email__main-container__content-container'>
                <div
                    className='verify-email__main-container__content-container__title-container'>
                    <TitleText
                        className='verify-email__main-container__content-container__title-container__title'>
                        Email Verification
                    </TitleText>
                    <GraphicTextLogo className='logo--graphic-text'/>
                    <GraphicLogo className='logo--graphic'/>
                </div>
                <Separator/>
                <div
                    className='verify-email__main-container__content-container__content'>
                    {isLoading && <ParagraphText>Loading...</ParagraphText>}
                    {!isLoading && error && (
                        <ParagraphText>
                            {error.message[0].charAt(0).toUpperCase() + error.message.slice(1)}
                        </ParagraphText>
                    )}
                    {!isLoading && !error && (
                        <ParagraphText>
                            Your email has been verified successfully!
                        </ParagraphText>
                    )}
                </div>
            </div>
        </div>
    )
}