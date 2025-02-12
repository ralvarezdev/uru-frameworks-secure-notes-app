import Form from "../../../../components/Form/Form.jsx";
import Input from "../../../../components/Input/Input.jsx";
import Password from "../../../../components/Input/Password/Password.jsx";
import PrimaryButton from "../../../../components/Button/Primary/Primary.jsx";
import Paragraph from "../../../../components/Text/Paragraph/Paragraph.jsx";
import Link from "../../../../components/Link/Link.jsx";
import TwoFactorAuth
    from "../../../../layouts/Auth/TwoFactorAuth/TwoFactorAuth.jsx";

// 2FA TOTP page
export default function TOTP({username, password}) {
    return (
        <TwoFactorAuth>
            <Form className='form' method='post'>
                <Input type="text" id="username" name="username"
                       label="Username" placeholder="e.g. user123"/>
                <Password id="password" name="password" label="Password"
                          placeholder="e.g. pass123"/>
                <PrimaryButton
                    className='submit-button'>Continue</PrimaryButton>
            </Form>
            <ul className='footer-container'>
                <li>
                    <Paragraph className='footer-text'>Don&#39;t you have an
                        account?</Paragraph>
                    <Link className='footer-text' to='/signup'>Sign Up</Link>
                </li>
                <li>
                    <Paragraph className='footer-text'>Forgot your
                        password?</Paragraph>
                    <Link className='footer-text' to='/forgot-password'>Reset
                        Password</Link>
                </li>
            </ul>
        </TwoFactorAuth>
    )
}