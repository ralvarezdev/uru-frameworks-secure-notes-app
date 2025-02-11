import './Password.css'
import '../Input.css'
import {useCallback, useState} from "react";
import TransparentIconButton from "../../Button/Transparent/Icon/Icon.jsx";
import Input from "../Input.jsx";

// Password component
export default function Password({...props}) {
    // If the input is a password
    const [passwordVisible, setPasswordVisible] = useState(false);

    // Toggle password visibility
    const togglePasswordVisibility = useCallback((event) => {
        event.preventDefault();
        setPasswordVisible(!passwordVisible);
    }, [passwordVisible]);

    return (
        <Input type={passwordVisible ? 'text' : 'password'} {...props}>
            <TransparentIconButton className='toggle'
                                   onClick={togglePasswordVisibility}>
                    {passwordVisible ? 'visibility' : 'visibility_off'}
            </TransparentIconButton>
        </Input>
    );
}