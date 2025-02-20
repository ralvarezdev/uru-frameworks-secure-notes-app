import ModalLayout from "../../layouts/Modal/Modal.jsx";

// Error page
export default function Error({children}) {
    return (
        <ModalLayout title='An error occurred'>
            {children}
        </ModalLayout>
    )
}
