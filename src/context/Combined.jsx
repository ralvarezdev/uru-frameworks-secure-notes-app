import {NotesProvider} from "./Notes.jsx";
import {TagsProvider} from "./Tags.jsx";
import {AuthProvider} from "./Auth.jsx";
import {NotificationProvider} from "./Notification.jsx";
import {LogInProvider} from "./LogIn.jsx";

// Combined context provider
export default function CombinedProvider({children}) {
    return (
        <NotificationProvider>
            <NotesProvider>
                <TagsProvider>
                     <AuthProvider>
                        <LogInProvider>
                            {children}
                        </LogInProvider>
                     </AuthProvider>
                </TagsProvider>
            </NotesProvider>
        </NotificationProvider>
    )
}