import NotesProvider from "./Notes.jsx";
import TagsProvider from "./Tags.jsx";
import AuthProvider from "./Auth.jsx";
import Notification from "../components/Notification/Notification.jsx";
import LogInProvider from "./LogIn.jsx";

// Combined context provider
export default function CombinedProvider({children}) {
    return (
        <Notification>
            <AuthProvider>
                <LogInProvider>
                    <NotesProvider>
                        <TagsProvider>
                            {children}
                        </TagsProvider>
                    </NotesProvider>
                </LogInProvider>
            </AuthProvider>
        </Notification>
    )
}