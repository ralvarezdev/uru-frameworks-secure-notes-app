import './Password.css'
import '../Input.css'
import {useState} from "react";
import TransparentIconButton from "../../Button/Transparent/Icon/Icon.jsx";
import Input from "../Input.jsx";

// Password component
function Password({id, className, label, name, placeholder, ...props}) {
    // If the input is a password
    const [passwordVisible, setPasswordVisible] = useState(false);

    // Toggle password visibility
    const togglePasswordVisibility = (event) => {
        event.preventDefault();
        setPasswordVisible(!passwordVisible);
    };

    return (
        <Input id={id} label={label} className={className}
               type={passwordVisible ? 'text' : 'password'} name={name}
               placeholder={placeholder}
               {...props}
        >
            <TransparentIconButton className='toggle' onClick={togglePasswordVisibility}>
                    {passwordVisible ? 'visibility' : 'visibility_off'}
            </TransparentIconButton>
        </Input>
    );
}

export default Password;