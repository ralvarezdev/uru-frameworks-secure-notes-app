// SignUp page
import Auth from "../../layouts/Auth/Auth.jsx";
import Button from "../../components/Button/Button.jsx";
import Input from "../../components/Input/Input.jsx";
import Title from "../../components/Text/Title/Title.jsx";
import Link from "../../components/Link/Link.jsx";
import Form from "../../components/Form/Form.jsx";
import Text from "../../components/Text/Text.jsx";

function SignUp() {
    return (
        <Auth>
            <Title className='title'>Sign Up</Title>
            <Form>
                <Input type="text" placeholder="Fist Name"/>
                <Input type="text" placeholder="Last Name"/>
                <Input type="text" placeholder="Username"/>
                <Input type="email" placeholder="Email"/>
                <Input type="password" placeholder="Password"/>
                <Button>SignUp</Button>
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

export default SignUp