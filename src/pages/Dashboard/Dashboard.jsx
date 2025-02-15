import './Dashboard.css'
import PrimaryButton from "../../components/Button/Primary/Primary.jsx";
import requestAPI from "../../utils/api.js";
import {useCallback} from "react";
import {useNotification} from "../../context/Notification.jsx";
import {useNavigate} from "react-router-dom";

// Dashboard page
export default function Dashboard() {
    const navigate = useNavigate()
    const {addInfoNotification, addErrorNotification} = useNotification();

    // Handle log out
    const handleLogOut = useCallback(async () => {
        // Send the request to the API
        const response = await requestAPI('POST', '/auth/logout');

        // Check if log out was successful
        if (response?.status === 'success') {
            addInfoNotification('Logged out successfully!');
            navigate('/login');
        }

        // Check if there was an error
        if (response.status === 'error')
            addErrorNotification(response?.message);
    }, [addErrorNotification, addInfoNotification, navigate]);

    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to the Home page</p>
            <PrimaryButton onClick={handleLogOut}>Log Out</PrimaryButton>
        </div>
    )
}