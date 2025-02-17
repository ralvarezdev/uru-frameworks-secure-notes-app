import './VerifyEmail.css'
import {useLocation} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {sendRequest} from "../../utils/api.js";
import TitleText from "../../components/Text/Title/Title.jsx";
import ParagraphText from "../../components/Text/Paragraph/Paragraph.jsx";
import GraphicTextLogo from "../../components/Logo/GraphicText/GraphicText.jsx";
import GraphicLogo from "../../components/Logo/Graphic/Graphic.jsx";
import Separator from "../../components/Separator/Separator.jsx";

// Verify email page
export default function VerifyEmail() {
    const location = useLocation();
    const [verified, setVerified] = useState(null);

    // Request handler
    const handleRequest = useCallback(async (token) => {
        // Send the request to the API
        const response = await sendRequest('POST', '/auth/email/verify', {
            token
        });

        // Check if the email was verified successfully
        if (response?.status === 'success') {
            setVerified(true);
            return
        }

        setVerified(false);
    }, [setVerified]);

    // Extract the token from the URL
    useEffect(() => {
        const token = location.pathname.split('/')[2];

        // Send the request to the API
        handleRequest(token).then()
    }, [location.pathname, handleRequest]);

    return (
        <div className='verify-email__main-container'>
            <div className='verify-email__main-container__content-container'>
                <div className='verify-email__main-container__content-container__title-container'>
                    <TitleText
                        className='verify-email__main-container__content-container__title-container__title'>
                        Email Verification
                    </TitleText>
                    <GraphicTextLogo className='logo--graphic-text'/>
                    <GraphicLogo className='logo--graphic'/>
                </div>
                <Separator/>
                <div className='verify-email__main-container__content-container__content'>
                    {verified === null && <ParagraphText>Loading...</ParagraphText>}
                    {verified === false &&
                        <ParagraphText>There was an error verifying your
                            email.</ParagraphText>}
                    {verified === true && <ParagraphText>Your email has been verified
                        successfully!</ParagraphText>}
                </div>
            </div>
        </div>
    )
}