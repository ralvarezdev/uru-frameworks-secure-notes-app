import Input from "../../../../components/Input/Input.jsx";
import AuthLayout from "../../../../layouts/Auth/Auth.jsx";
import {useState} from "react";
import {useNotification} from "../../../../context/Notification.jsx";
import {useMutation} from "react-query";
import {LogInHandleRequest} from '../../LogIn.jsx'
import {
    DASHBOARD,
    TWO_FACTOR_AUTHENTICATION_EMAIL_CODE,
    TWO_FACTOR_AUTHENTICATION_RECOVERY_CODE
} from "../../../../endpoints.js";
import {TOTP_CODE_2FA_METHOD} from "../../../../constants.js";
import {
    getPassword,
    getUsername, setIsLoggingIn
} from "../../../../sessionStorage/sessionStorage.js";

// 2FA TOTP code page
export default function TOTPCode() {
    const {addErrorNotification, addInfoNotification} = useNotification();
    const [isOnError, setIsOnError] = useState(false);

    // 2FA TOTP code mutation
    const mutation = useMutation(LogInHandleRequest, {
        onSuccess: (data) => {
            if (data?.status !== 'success')
                setIsOnError(true);
            else {
                setIsLoggingIn(false)
                addInfoNotification('Logged in successfully!');
                window.location.href = DASHBOARD;
            }
        },
        onError: (error) => addErrorNotification(error.message)
    });

    // Handle the form submission
    const handleSubmit = (formData) => {
        const totpCode = formData.get("totp-code");
        mutation.mutate({
            username: getUsername(),
            password: getPassword(),
            twoFactorAuthenticationCode: totpCode,
            twoFactorAuthenticationCodeType: TOTP_CODE_2FA_METHOD
        });
    };

    return (
        <AuthLayout titleText='TOTP'
                    footer={[
                        {
                            to: TWO_FACTOR_AUTHENTICATION_RECOVERY_CODE,
                            text: 'Don\'t you have access to your 2FA?',
                            children: 'Recovery Code'
                        },
                        {
                            to: TWO_FACTOR_AUTHENTICATION_EMAIL_CODE,
                            text: 'Do you have access to your email?',
                            children: 'Email Code'
                        }]}
                    isOnError={isOnError} setIsOnError={setIsOnError}
                    onSubmit={handleSubmit}
                    isSubmitting={mutation.isLoading}>
            <Input type="text" id="totp-code" name="totp-code"
                   label="TOTP code" placeholder="Enter your TOTP code"
                   error={mutation.data?.data?.["2fa_code"]?.[0]}
                   isOnError={isOnError}
                   required/>
        </AuthLayout>
    );
}