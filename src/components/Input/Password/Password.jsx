import './Password.css'
import '../Input.css'
import {useCallback, useState} from "react";
import TransparentIconButton from "../../Button/Transparent/Icon/Big/Big.jsx";
import Input from "../Input.jsx";

// Password input component
export default function PasswordInput({...props}) {
    // If the input is a password
    const [passwordVisible, setPasswordVisible] = useState(false);

    // Toggle password visibility
    const togglePasswordVisibility = useCallback((event) => {
        event.preventDefault();
        setPasswordVisible(!passwordVisible);
    }, [passwordVisible]);

    return (
        <Input type={passwordVisible ? 'text' : 'password'} {...props}>
            <TransparentIconButton
                className='input__main-container__input-container__button'
                onClick={togglePasswordVisibility}>
                {passwordVisible ? 'visibility' : 'visibility_off'}
            </TransparentIconButton>
        </Input>
    );
}