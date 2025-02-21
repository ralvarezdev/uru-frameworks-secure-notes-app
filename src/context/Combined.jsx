import NotesProvider from "./Notes.jsx";
import TagsProvider from "./Tags.jsx";
import AuthProvider from "./Auth.jsx";
import Notification from "./Notification.jsx";
import LogInProvider from "./LogIn.jsx";

// Combined context provider
export default function CombinedProvider({children}) {
    return (
        <Notification>
            <NotesProvider>
                <TagsProvider>
                     <AuthProvider>
                        <LogInProvider>
                            {children}
                        </LogInProvider>
                     </AuthProvider>
                </TagsProvider>
            </NotesProvider>
        </Notification>
    )
}