import Input from "../../../../components/Input/Input.jsx";
import AuthLayout from "../../../../layouts/Auth/Auth.jsx";
import {useLogIn} from "../../../../context/LogIn.jsx";
import {useState} from "react";
import {useNotification} from "../../../../context/Notification.jsx";
import {useMutation} from "react-query";
import {LogInHandleRequest} from '../../LogIn.jsx'
import {
    DASHBOARD,
    TWO_FACTOR_AUTHENTICATION_EMAIL_CODE,
    TWO_FACTOR_AUTHENTICATOR_TOTP_CODE
} from "../../../../endpoints.js";
import {RECOVERY_CODE_2FA_METHOD} from "../../../../constants.js";

// 2FA Recovery code page
export default function RecoveryCode() {
    const {logIn, setLogIn,} = useLogIn();
    const {addErrorNotification, addInfoNotification} = useNotification();
    const [isOnError, setOnError] = useState(false);

    // 2FA Recovery code mutation
    const mutation = useMutation(LogInHandleRequest, {
        onSuccess: (data) => {
            if (data?.status !== 'success') {
                setOnError(true);

                // HANDLE NEW RECOVERY CODES
            } else {
                setLogIn(null)
                addInfoNotification('Logged in successfully!');
                window.location.href = DASHBOARD;
            }
        },
        onError: (error) => addErrorNotification(error.message)
    });

    // Handle the form submission
    const handleSubmit = (formData) => {
        const recoveryCode = formData.get("recovery-code");
        mutation.mutate({
            username: logIn?.username,
            password: logIn?.password,
            twoFactorAuthenticationCode: recoveryCode,
            twoFactorAuthenticationCodeType: RECOVERY_CODE_2FA_METHOD
        });
    };

    return (
        <AuthLayout titleText='Recovery Code'
                    footer={[{
                        to: TWO_FACTOR_AUTHENTICATION_EMAIL_CODE,
                        text: 'Do you have access to your email?',
                        children: 'Email Code'
                    },
                        logIn?.twoFactorAuthenticationMethods?.includes(TWO_FACTOR_AUTHENTICATOR_TOTP_CODE)
                            ? {
                                to: TWO_FACTOR_AUTHENTICATOR_TOTP_CODE,
                                text: 'Do you have access to your TOTP?',
                                children: 'TOTP Code'
                            } : null,
                    ]}
                    isOnError={isOnError} setOnError={setOnError}
                    onSubmit={handleSubmit}
                    isSubmitting={mutation.isLoading}>
            <Input type="text" id="recovery-code" name="recovery-code"
                   label="Recovery code" placeholder="Enter your recovery code"
                   error={mutation.data?.data?.["2fa_code"]?.[0]}
                   isOnError={isOnError}
                   required/>
        </AuthLayout>
    );
}