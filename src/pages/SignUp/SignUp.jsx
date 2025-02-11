import './SignUp.css'
import Auth from "../../layouts/Auth/Auth.jsx";
import PrimaryButton from "../../components/Button/Primary/Primary.jsx";
import Input from "../../components/Input/Input.jsx";
import Link from "../../components/Link/Link.jsx";
import Form from "../../components/Form/Form.jsx";
import Text from "../../components/Text/Text.jsx";
import PasswordInput from "../../components/Input/Password/Password.jsx";

// SignUp page
export default function SignUp() {
    return (
        <Auth title='Sign Up'>
            <Form method='post'>
                <Input type="text" id="first-name" name="first-name"
                       label="First Name" placeholder="e.g. John"/>
                <Input type="text" id="last-name" name="last-name"
                       label="Last Name" placeholder="e.g. Smith"/>
                <Input type="email" id="email" name="email"
                       label="Email" placeholder="e.g. johnsmith@mail.com"/>
                <Input type="text" id="username" name="username"
                       label="Username" placeholder="e.g. user123"/>
                <PasswordInput type="password" id="password" name="password"
                               label="Password" placeholder="e.g. pass123"/>
                <PrimaryButton
                    className='submit-button'>Continue</PrimaryButton>
            </Form>
            <ul className='footer-container'>
                <li>
                    <Text className='footer-text'>Do you have an account?</Text>
                    <Link to='/login' className='footer-text'>Log In</Link>
                </li>
            </ul>
        </Auth>
    )
}