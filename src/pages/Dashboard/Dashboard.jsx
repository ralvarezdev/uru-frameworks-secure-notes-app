import './Dashboard.css'
import PrimaryButton from "../../components/Button/Primary/Primary.jsx";
import {sendAuthenticatedRequest} from "../../utils/api.js";
import {useCallback} from "react";
import {useNotification} from "../../context/Notification.jsx";
import {LOG_IN} from "../../endpoints.js";
import HomeLayout from "../../layouts/Home/Home.jsx";
import {getPassword} from "../../sessionStorage/sessionStorage.js";
import Modal from "../../components/Modal/Modal.jsx";
import TitleText from "../../components/Text/Title/Title.jsx";
import {decryptText, deriveKey} from "../../utils/crypto.js";
import {
    getEncryptedKeyFromCookie,
    getSaltFromCookie
} from "../../utils/cookies.js";
import Separator from "../../components/Separator/Separator.jsx";
import Password from "../../components/Input/Password/Password.jsx";

// Dashboard page
export default function Dashboard() {
    const {addInfoNotification, addErrorNotification} = useNotification();

    // Handle entered password

    // Handle log out
    const handleLogOut = useCallback(async () => {
        // Send the request to the API
        const response = await sendAuthenticatedRequest('POST', '/auth/logout');

        // Check if log out was successful
        if (response?.status === 'success') {
            addInfoNotification('Logged out successfully!');
            window.location.href = LOG_IN;
        }

        // Check if there was an error
        if (response.status === 'error')
            addErrorNotification(response?.message);
    }, [addErrorNotification, addInfoNotification]);

    return (
        <>
            {!getPassword()&&
            <Modal>
                <TitleText>Authentication</TitleText>
                <Separator/>
                <p>Please enter your password to continue</p>
                <Password id="password" name="password" label="Password"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      error={mutation.data?.data?.password?.[0]}
                      isOnError={isOnError} required/>

            </Modal>}
            <HomeLayout settings={<PrimaryButton onClick={handleLogOut}>Log Out</PrimaryButton>}>
            </HomeLayout>
        </>
    )
}

/*
	// UserNote is the response DTO for the user note
	UserNote struct {
		Title               string     `json:"title"`
		NoteTagsID          []string   `json:"note_tags_id"`
		Color               *string    `json:"color,omitempty"`
		CreatedAt           time.Time  `json:"created_at"`
		UpdatedAt           *time.Time `json:"updated_at,omitempty"`
		PinnedAt            *time.Time `json:"pinned_at,omitempty"`
		StarredAt           *time.Time `json:"starred_at,omitempty"`
		ArchivedAt          *time.Time `json:"archived_at,omitempty"`
		TrashedAt           *time.Time `json:"trashed_at,omitempty"`
		DeletedAt           *time.Time `json:"deleted_at,omitempty"`
		LatestNoteVersionID *int64     `json:"latest_note_version_id,omitempty"`
	}

	// UserNoteWithID is the response DTO for the user note with ID
	UserNoteWithID struct {
		ID int64 `json:"id"`
		UserNote
	}

	// UserNoteVersion is the response DTO for the user note version
	UserNoteVersion struct {
		NoteID           *int64     `json:"note_id,omitempty"`
		EncryptedContent string     `json:"encrypted_content"`
		CreatedAt        time.Time  `json:"created_at"`
		DeletedAt        *time.Time `json:"deleted_at,omitempty"`
	}

	// UserNoteTagWithID is the response DTO for the user note tag with ID
	UserNoteTagWithID struct {
		ID int64 `json:"id"`
		UserNoteTag
	}

	// SyncUserNote is the response DTO for the sync user note
	SyncUserNote struct {
		Title            *string                  `json:"title,omitempty"`
		Color            *string                  `json:"color,omitempty"`
		CreatedAt        *time.Time               `json:"created_at,omitempty"`
		UpdatedAt        *time.Time               `json:"updated_at,omitempty"`
		PinnedAt         *time.Time               `json:"pinned_at,omitempty"`
		StarredAt        *time.Time               `json:"starred_at,omitempty"`
		ArchivedAt       *time.Time               `json:"archived_at,omitempty"`
		TrashedAt        *time.Time               `json:"trashed_at,omitempty"`
		DeletedAt        *time.Time               `json:"deleted_at,omitempty"`
		SyncNoteVersions []*UserNoteVersionWithID `json:"sync_note_versions"`
		SyncNoteTags     []*UserNoteTag           `json:"sync_note_tags"`
	}

	// SyncUserNoteWithID is the response DTO for the sync user note with ID
	SyncUserNoteWithID struct {
		ID int64 `json:"id"`
		SyncUserNote
	}
    */