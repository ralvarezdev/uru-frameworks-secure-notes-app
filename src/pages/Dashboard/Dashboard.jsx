import './Dashboard.css'
import PrimaryButton from "../../components/Button/Primary/Primary.jsx";
import {sendAuthenticatedRequest} from "../../utils/api.js";
import {useCallback} from "react";
import {useNotification} from "../../context/Notification.jsx";
import {LOG_IN} from "../../endpoints.js";
import HomeLayout from "../../layouts/Home/Home.jsx";

// Dashboard page
export default function Dashboard() {
    const {addInfoNotification, addErrorNotification} = useNotification();

    // Handle log out
    const handleLogOut = useCallback(async () => {
        // Send the request to the API
        const response = await sendAuthenticatedRequest('POST', '/auth/logout');

        // Check if log out was successful
        if (response?.status === 'success') {
            addInfoNotification('Logged out successfully!');
            window.location.href=LOG_IN;
        }

        // Check if there was an error
        if (response.status === 'error')
            addErrorNotification(response?.message);
    }, [addErrorNotification, addInfoNotification]);

    return (
        <HomeLayout settings={<PrimaryButton onClick={handleLogOut}>Log Out</PrimaryButton>}>
        </HomeLayout>
    )
}