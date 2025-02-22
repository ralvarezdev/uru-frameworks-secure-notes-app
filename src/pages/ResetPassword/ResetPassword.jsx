import './ResetPassword.css'
import {sendRequest} from "../../utils/api.js";
import {useLocation} from "react-router-dom";
import Password from "../../components/Input/Password/Password.jsx";
import AuthLayout from "../../layouts/Auth/Auth.jsx";
import {useNotification} from "../../context/Notification.jsx";
import {useCallback, useState} from "react";
import {useMutation} from "react-query";
import {LOG_IN} from "../../endpoints.js";
import Modal from "../../components/Modal/Modal.jsx";
import SecondaryButton from "../../components/Button/Secondary/Secondary.jsx";
import TitleText from "../../components/Text/Title/Title.jsx";
import ParagraphText from "../../components/Text/Paragraph/Paragraph.jsx";
import Separator from "../../components/Separator/Separator.jsx";

// Reset password request handler
async function ResetPasswordHandleRequest({
                                              token,
                                              password,
                                              passwordConfirmation
                                          }) {
    // Check if the passwords match
    if (password !== passwordConfirmation) return {
        status: 'fail',
        data: {
            new_password: ['The passwords do not match'],
        }
    }

    const [, response] = await sendRequest('POST', '/auth/password/reset', {
        token,
        new_password: password,
    });

    // Check if the password was reset successfully
    if (response?.status !== 'error')
        return {...response};

    throw new Error(response?.message)
}

// Reset Password page
export default function ResetPassword() {
    const location = useLocation();
    const token = location.pathname.split('/')[2];
    const {addErrorNotification, addInfoNotification} = useNotification();
    const [isOnError, setIsOnError] = useState(false);
    const [showFirstConfirmationModal, setShowFirstConfirmationModal] = useState(false);
    const [showSecondConfirmationModal, setShowSecondConfirmationModal] = useState(false);

    // Handle show first confirmation modal
    const handleShowFirstConfirmationModal = useCallback(() => setShowFirstConfirmationModal(prevShowFirstConfirmationModal => !prevShowFirstConfirmationModal), []);

    // Handle show second confirmation modal
    const handleShowSecondConfirmationModal = useCallback(() => {
        setShowSecondConfirmationModal(prevShowSecondConfirmationModal => !prevShowSecondConfirmationModal)
        handleShowFirstConfirmationModal()
    }, [handleShowFirstConfirmationModal]);

    // Reset password mutation
    const mutation = useMutation(ResetPasswordHandleRequest, {
        onSuccess: (data) => {
            if (data?.status === 'success') {
                addInfoNotification('Password reset successfully!');
                window.location.href = LOG_IN;
            } else if (data?.data?.token?.[0])
                addErrorNotification(data?.data?.token?.[0]);
            else
                setOnError(true);
        },
        onError: (error) => addErrorNotification(error.message)
    });

    // Handle the form submission
    const handleSubmit = (formData) => {
        const password = formData.get("password");
        const passwordConfirmation = formData.get("password-confirmation");
        mutation.mutate({password, passwordConfirmation, token});
    };

    return (
        <>
            {showFirstConfirmationModal&&(
                <Modal header={(
                    <TitleText>Reset Password</TitleText>
                )} onClose={handleShowFirstConfirmationModal}>
                    <ParagraphText>Are you sure you want to reset your password?</ParagraphText>
                    <ParagraphText>Your notes, note tags and tags WILL be deleted!</ParagraphText>
                    <div className='modal__content-container__footer-container'>
                        <SecondaryButton className='button--secondary--unfilled'  onClick={handleShowSecondConfirmationModal}>Continue</SecondaryButton>
                        <SecondaryButton onClick={handleShowFirstConfirmationModal}>Go Back</SecondaryButton>
                    </div>
                </Modal>
            )}
            {showSecondConfirmationModal&&(
                <Modal header={(
                    <TitleText>Reset Password</TitleText>
                )} onClose={handleShowSecondConfirmationModal}>
                    <ParagraphText>Are you sure 100% sure?</ParagraphText>
                    <ParagraphText>This action cannot be reverted</ParagraphText>
                    <div className='modal__content-container__footer-container'>
                        <SecondaryButton className='button--secondary--unfilled'  onClick={handleSubmit}>Continue</SecondaryButton>
                        <SecondaryButton onClick={handleShowSecondConfirmationModal}>Go Back</SecondaryButton>
                    </div>
                </Modal>
            )}
            <AuthLayout titleText='Reset Password'
                    footer={[{
                        to: LOG_IN,
                        text: 'Remembered your password?',
                        children: 'Log In'
                    }]}
                    isOnError={isOnError} setIsOnError={setIsOnError}
                    onSubmit={handleShowFirstConfirmationModal}
                    isSubmitting={mutation.isLoading}>
                <Password id="password" name="password" label="Password"
                          placeholder="Enter your password"
                          error={mutation.data?.data?.new_password?.[0]}
                          isOnError={isOnError} required/>
                <Password id="password-confirmation" name="password-confirmation"
                          label="Password Confirmation"
                          placeholder="Confirm your password"
                          error={mutation.data?.data?.new_password?.[0]}
                          isOnError={isOnError} required/>
            </AuthLayout>
        </>
    );
}
