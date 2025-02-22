import './Dashboard.css'
import {sendAuthenticatedRequest} from "../../utils/api.js";
import {useCallback, useState} from "react";
import {useNotification} from "../../context/Notification.jsx";
import {LOG_IN} from "../../endpoints.js";
import HomeLayout from "../../layouts/Home/Home.jsx";
import {getPassword, setPassword} from "../../sessionStorage/sessionStorage.js";
import Modal from "../../components/Modal/Modal.jsx";
import TitleText from "../../components/Text/Title/Title.jsx";
import Separator from "../../components/Separator/Separator.jsx";
import Password from "../../components/Input/Password/Password.jsx";
import SecondaryButton from "../../components/Button/Secondary/Secondary.jsx";
import ParagraphText from "../../components/Text/Paragraph/Paragraph.jsx";
import {comparePasswordWithHash} from "../../utils/crypto.js";
import {getPasswordHashFromCookie} from "../../utils/cookies.js";

// Dashboard page
export default function Dashboard() {
    const {addInfoNotification, addErrorNotification} = useNotification();
    const [isOnError, setOnError] = useState(false);

    // Handle entered password
    const handleEnteredPassword = useCallback(async () => {
        const password = document.getElementById('password').value;

        // Compare the entered password with the stored password
        const match=await comparePasswordWithHash(password, getPasswordHashFromCookie())
        if (match) {
            setOnError(false);
            setPassword(password);
            addInfoNotification('Password entered successfully!');
            return;
        }

        setOnError(true);
    }, [addInfoNotification]);


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
            <Modal header={(
                    <TitleText>Authentication</TitleText>
                )}>
                <Password id="password" name="password" label="Please enter your password to continue"
                          isLabelInside={false}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      error={isOnError&&"Invalid password"}
                      isOnError={isOnError} required/>
                <SecondaryButton className='modal__content-container__content__button' onClick={handleEnteredPassword}>Continue</SecondaryButton>
            </Modal>}
            <HomeLayout menu={<SecondaryButton onClick={handleLogOut}>Log Out</SecondaryButton>}>
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