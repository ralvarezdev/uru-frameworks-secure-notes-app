import {NotesProvider} from "./Notes.jsx";
import {TagsProvider} from "./Tags.jsx";
import {AuthProvider} from "./Auth.jsx";
import {NotificationProvider} from "./Notification.jsx";

// Combined context provider
export default function CombinedProvider({children}) {
    return (
        <NotificationProvider>
            <NotesProvider>
                <TagsProvider>
                    <AuthProvider>
                        {children}
                    </AuthProvider>
                </TagsProvider>
            </NotesProvider>
        </NotificationProvider>
    )
}