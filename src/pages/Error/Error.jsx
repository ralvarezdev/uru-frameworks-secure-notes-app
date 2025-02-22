import MessageLayout from "../../layouts/Message/Message.jsx";

// Error page
export default function Error({children}) {
    return (
        <MessageLayout title='An error occurred'>
            {children}
        </MessageLayout>
    )
}
