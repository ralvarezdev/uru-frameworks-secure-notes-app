import Auth from "../../layouts/Auth/Auth.jsx";
import Title from "../../components/Text/Title/Title.jsx";
import Form from "../../components/Form/Form.jsx";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import Text from "../../components/Text/Text.jsx";
import Link from "../../components/Link/Link.jsx";

// ForgotPassword page
function ForgotPassword() {
    return (
        <Auth title='Forgot Password'>
            <Title className='title'>Forgot Password</Title>
            <Form>
                <p className={'form-description'}>
                    Enter your email address and we will send you a link to
                    reset your password.
                </p>
                <Input type="email" placeholder="Email"/>
                <Button>Send</Button>
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