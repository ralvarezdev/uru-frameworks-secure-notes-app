import Auth from "../Auth.jsx";

// Two-Factor Authentication layout
export default function TwoFactorAuth({children, ...props}) {
    return (
        <Auth title='2FA' {...props}>
            {children}
        </Auth>
    )
}