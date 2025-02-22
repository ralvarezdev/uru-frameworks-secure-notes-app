import Input from "../../../../components/Input/Input.jsx";
import AuthLayout from "../../../../layouts/Auth/Auth.jsx";
import {useCallback, useState} from "react";
import {useNotification} from "../../../../context/Notification.jsx";
import {useMutation} from "react-query";
import {LogInHandleRequest} from '../../LogIn.jsx'
import {
    DASHBOARD,
    TWO_FACTOR_AUTHENTICATION_EMAIL_CODE,
    TWO_FACTOR_AUTHENTICATION_RECOVERY_CODE,
    TWO_FACTOR_AUTHENTICATOR_TOTP_CODE
} from "../../../../endpoints.js";
import {
    get2FAMethods, getPassword,
    getUsername, setIsLoggingIn
} from "../../../../sessionStorage/sessionStorage.js";
import {sendRequest} from "../../../../utils/api.js";

// 2FA Email code page
export default function EmailCode() {
    const {addErrorNotification, addInfoNotification} = useNotification();
    const [isOnError, setOnError] = useState(false);

    // Send email code handler
    const handleSendEmailCode = useCallback(async () => {
        const [, response] = await sendRequest('POST', '/auth/2fa/email-code/send', {
            username: getUsername(),
            password: getPassword()
        });

        if (response?.status === 'error')
            addErrorNotification(response.message)
        else if(response?.status === 'fail')
            addErrorNotification(response?.data?.username?.[0]??response?.data?.password?.[0]);
        else
            addInfoNotification('Email code sent successfully!');
    }, [addInfoNotification, addErrorNotification]);

    // 2FA Email code mutation
    const mutation = useMutation(LogInHandleRequest, {
        onSuccess: (data) => {
            if (data?.status !== 'success')
                setOnError(true);
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
        const emailCode = formData.get("email-code");
        mutation.mutate({
            username: getUsername(),
            password: getPassword(),
            twoFactorAuthenticationCode: emailCode,
            twoFactorAuthenticationCodeType: TWO_FACTOR_AUTHENTICATION_EMAIL_CODE
        });
    };

    return (
        <AuthLayout titleText='Email Code'
                    footer={[
                        {
                            onClick: handleSendEmailCode,
                            text: 'Didn\'t receive the code?',
                            children: 'Send code again'
                        },
                        {
                        to: TWO_FACTOR_AUTHENTICATION_RECOVERY_CODE,
                        text: 'Don\'t you have access to your 2FA?',
                        children: 'Recovery Code'
                    },
                        get2FAMethods()?.includes(TWO_FACTOR_AUTHENTICATOR_TOTP_CODE)
                            ? {
                                to: TWO_FACTOR_AUTHENTICATOR_TOTP_CODE,
                                text: 'Do you have access to your TOTP?',
                                children: 'TOTP Code'
                            } : null,
                    ]}
                    isOnError={isOnError} setOnError={setOnError}
                    onSubmit={handleSubmit}
                    isSubmitting={mutation.isLoading}>
            <Input type="text" id="email-code" name="email-code"
                   label="Email code" placeholder="Enter your email code"
                   error={mutation.data?.data?.["2fa_code"]?.[0]}
                   isOnError={isOnError}
                   required/>
        </AuthLayout>
    );
}