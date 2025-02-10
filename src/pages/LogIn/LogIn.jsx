import './LogIn.css'
import PrimaryButton from "../../components/Button/Primary/Primary.jsx";
import Input from "../../components/Input/Input.jsx";
import Auth from "../../layouts/Auth/Auth.jsx";
import Link from "../../components/Link/Link.jsx";
import Text from "../../components/Text/Text.jsx";
import Form from "../../components/Form/Form.jsx";
import PasswordInput from "../../components/Input/Password/Password.jsx";

// LogIn page
function LogIn() {
    return (
        <Auth title='Log In'>
            <Form className='form'>
                <Input type="text" id="username" name="username"
                       label="Username" placeholder="e.g. user123"/>
                <PasswordInput id="password" name="password" label="Password"
                          placeholder="e.g. pass123"/>
                <PrimaryButton
                    className='submit-button'>Continue</PrimaryButton>
            </Form>
            <ul className='footer-container'>
                <li>
                    <Text className='footer-text'>Don&#39;t you have an
                        account?</Text>
                    <Link className='footer-text' to='/signup'>Sign Up</Link>
                </li>
                <li>
                    <Text className='footer-text'>Forgot your password?</Text>
                    <Link className='footer-text' to='/forgot-password'>Reset
                        Password</Link>
                </li>
            </ul>
        </Auth>
    )
}

export default LogIn