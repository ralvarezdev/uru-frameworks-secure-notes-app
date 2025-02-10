import Auth from "../../layouts/Auth/Auth.jsx";
import Form from "../../components/Form/Form.jsx";
import Input from "../../components/Input/Input.jsx";
import PrimaryButton from "../../components/Button/Primary/Primary.jsx";
import Text from "../../components/Text/Text.jsx";
import Link from "../../components/Link/Link.jsx";

// ForgotPassword page
function ForgotPassword() {
    return (
        <Auth title='Forgot Password'>
            <Form method='post'>
                <Input type="email" id="email" name="email"
                       label="Email" placeholder="e.g. johnsmith@mail.com"/>
                <PrimaryButton className='submit-button'>Continue</PrimaryButton>
            </Form>
            <ul className='footer-container'>
                <li>
                    <Text className='footer-text'>Don&#39;t you have an
                        account?</Text>
                    <Link className='footer-text' to='/signup'>Sign Up</Link>
                </li>
                <li>
                    <Text className='footer-text'>Remember your password?</Text>
                    <Link className='footer-text' to='/login'>Log In</Link>
                </li>
            </ul>
        </Auth>
    )
}

export default ForgotPassword