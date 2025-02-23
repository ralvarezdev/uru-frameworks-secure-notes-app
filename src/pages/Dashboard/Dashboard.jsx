import './Dashboard.css'
import {sendAuthenticatedRequest} from "../../utils/api.js";
import {useCallback, useState} from "react";
import {useNotification} from "../../context/Notification.jsx";
import {LOG_IN} from "../../endpoints.js";
import {getPassword, setPassword} from "../../sessionStorage/sessionStorage.js";
import Modal from "../../components/Modal/Modal.jsx";
import TitleText from "../../components/Text/Title/Title.jsx";
import Password from "../../components/Input/Password/Password.jsx";
import SecondaryButton from "../../components/Button/Secondary/Secondary.jsx";
import {comparePasswordWithHash} from "../../utils/crypto.js";
import {getPasswordHashFromCookie} from "../../utils/cookies.js";
import Input from "../../components/Input/Input.jsx";
import ColorPalette from "../../components/ColorPalette/ColorPalette.jsx";
import ParagraphText from "../../components/Text/Paragraph/Paragraph.jsx";
import TransparentBigIconButton
    from "../../components/Button/Transparent/Icon/Big/Big.jsx";
import SubtitleText from "../../components/Text/Subtitle/Subtitle.jsx";
import CircularBigIconButton
    from "../../components/Button/Circular/Icon/Big/Big.jsx";
import Note from "../../components/Note/Note.jsx";
import {useNotes} from "../../context/Notes.jsx";
import {useMutation} from "react-query";
import CallToAction from "../../components/CallToAction/CallToAction.jsx";
import TextArea from "../../components/TextArea/TextArea.jsx";


// Dashboard page
export default function Dashboard() {
    const [isMenuContainerOpen, setIsMenuContainerOpen] = useState(null);
    const [isNoteContainerOpen, setIsNoteContainerOpen] = useState(null);
    const {
        notes,
        getNoteByID,
        getLatestNoteID,
        getLatestNoteVersionByNoteID,
        upsertNote,
        removeNoteByID
    } = useNotes();
    const [isViewNoteModalOpen, setIsViewNoteModalOpen] = useState(false);
    const [isCreateNoteModalOpen, setIsCreateNoteModalOpen] = useState(false);
    const [isDeleteNoteModalOpen, setIsDeleteNoteModalOpen] = useState(false);
    const [newNoteColor, setNewNoteColor] = useState(null)
    const [selectedNote, setSelectedNote] = useState(null)
    const [selectedNoteContent, setSelectedNoteContent] = useState(null)
    const [isOnError, setIsOnError] = useState(null)
    const {addInfoNotification, addErrorNotification} = useNotification()

    // Handle entered password
    const handleEnteredPassword = useCallback(async () => {
        const password = document.getElementById('password').value;

        // Compare the entered password with the stored password
        const match = await comparePasswordWithHash(password, getPasswordHashFromCookie())
        if (match) {
            setIsOnError(false);
            setPassword(password);
            addInfoNotification('Password entered successfully!');
            return;
        }

        setIsOnError(true);
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

    // Handle the menu container button click
    const handleMenuContainerButtonClick = useCallback(() => {
        setIsMenuContainerOpen((prevState) => !prevState);
    }, []);

    // Handle the notes container button click
    const handleNotesContainerButtonClick = useCallback(() => {
        setIsMenuContainerOpen((prevState) => !prevState);
    }, []);

    // Handle the note container button click
    const handleNoteContainerButtonClick = useCallback(() => {
        setIsNoteContainerOpen((prevState) => !prevState);
    }, []);

    // Handle the note view modal
    const handleNoteViewModal = useCallback((id) => {
        setSelectedNote(id ? getNoteByID(id) : null)
        setSelectedNoteContent(getLatestNoteVersionByNoteID(id)?.content)
        setIsViewNoteModalOpen((prevState) => !prevState);
    }, [getNoteByID, getLatestNoteVersionByNoteID])

    // Handle the note creation modal
    const handleNoteCreationModal = useCallback(() => {
        setIsOnError(false)
        setNewNoteColor(null)
        setIsCreateNoteModalOpen((prevState) => !prevState);
    }, []);

    // Handle the note deletion modal
    const handleNoteDeletionModal = useCallback((id) => {
        setSelectedNote(id ? getNoteByID(id) : null)
        setSelectedNoteContent(getLatestNoteVersionByNoteID(id)?.content)
        setIsDeleteNoteModalOpen((prevState) => !prevState);
    }, [getNoteByID, getLatestNoteVersionByNoteID]);

    // Handle the note edit
    const handleEditNote = useCallback((id) => {
        setSelectedNote(id ? getNoteByID(id) : null)
    }, [getNoteByID])

    // Handle the note deletion
    const handleOnDeleteNote = useCallback(() => {
        removeNoteByID(selectedNote.id)
        handleNoteDeletionModal(null)
    }, [selectedNote, removeNoteByID, handleNoteDeletionModal])

    // Handle the new note color
    const handleNewNoteColor = useCallback((color) => {
        setNewNoteColor(color)
    }, [])

    // Handle the note creation
    const handleNoteCreation = useCallback(async ({id, title, color}) => {
        // Check if the color hasn't been selected
        let failData = {}
        if (!color)
            failData.color = ["Invalid color"]

        //  Check the title
        if (!title)
            failData.title = ['Invalid title']

        // Check if there are any errors
        if (Object.keys(failData).length)
            return {status: 'fail', data: failData}

        // Create note
        const currentTime = new Date()
        await upsertNote({
            id,
            title,
            color,
            created_at: currentTime,
            updated_at: currentTime
        })
        return {status: 'success'}
    }, [upsertNote])

    // Handle the note on change
    const handleNoteChange = useCallback((event) => {
        event.preventDefault()
    }, [])

    // Handle the note on blur
    const handleNoteBlur = useCallback((event) => {
        event.preventDefault()
        setSelectedNoteContent(event.target.value)
    }, [])

    // Create note mutation
    const createNoteMutation = useMutation(handleNoteCreation, {
        onSuccess: (data) => {
            if (data?.status === 'success') {
                addInfoNotification('Note created successfully!');

                // Update the states
                setIsCreateNoteModalOpen((prevState) => !prevState);
                setNewNoteColor(null)
            } else
                setIsOnError(true);
        }
    })

    // Handle the note creation submit
    const handleNoteCreationSubmit = useCallback(() => {
        //  Get the note title
        const newNoteTitle = document.querySelector('#title').value

        // Get the note ID
        const latestNoteID = getLatestNoteID()
        const noteID = latestNoteID ? latestNoteID + 1 : 1

        createNoteMutation.mutate({
            id: noteID,
            title: newNoteTitle,
            color: newNoteColor
        });
    }, [createNoteMutation, getLatestNoteID, newNoteColor])

    return (
        <>
            {!getPassword() &&
                <Modal header={(
                    <TitleText>Authentication</TitleText>
                )}>
                    <Password id="password" name="password"
                              label="Please enter your password to continue"
                              isLabelInside={false}
                              placeholder="Enter your password"
                              autoComplete="current-password"
                              error={isOnError && "Invalid password"}
                              isOnError={isOnError} required/>
                    <SecondaryButton
                        className='modal__content-container__content__button'
                        onClick={handleEnteredPassword}>Continue</SecondaryButton>
                </Modal>}
            {isCreateNoteModalOpen && (
                <Modal header={(
                    <TitleText>New Note</TitleText>
                )} className='dashboard__note-creation-modal'
                       onClose={handleNoteCreationModal}
                       style={newNoteColor && {outlineColor: newNoteColor}}>
                    <CallToAction
                        className='dashboard__note-creation-modal__form'
                        isOnError={isOnError}
                        setIsOnError={setIsOnError}
                        onSubmit={handleNoteCreationSubmit}>
                        <Input type="text" id="title" name="title"
                               label="Title"
                               isLabelInside={false}
                               placeholder="Enter your title"
                               style={newNoteColor && {outlineColor: newNoteColor}}
                               error={createNoteMutation.data?.data?.title?.[0]}
                               isOnError={isOnError}/>
                        <ColorPalette onSelectedColor={handleNewNoteColor}
                                      error={createNoteMutation.data?.data?.color?.[0]}
                                      isOnError={isOnError}/>
                    </CallToAction>
                </Modal>
            )}
            {isDeleteNoteModalOpen && (
                <Modal header={(
                    <TitleText>Delete Note</TitleText>
                )} className='dashboard__note-deletion-modal'
                       onClose={handleNoteDeletionModal}
                       style={{outlineColor: selectedNote.color}}>
                    <ParagraphText>Are you sure you want to delete this
                        note?</ParagraphText>
                    <div
                        className='dashboard__note-deletion-modal__buttons-container'>
                        <SecondaryButton className='button--secondary--unfilled'
                                         onClick={handleOnDeleteNote}>Yes</SecondaryButton>
                        <SecondaryButton
                            onClick={handleNoteDeletionModal}>No</SecondaryButton>
                    </div>
                </Modal>
            )}
            {isViewNoteModalOpen && (
                <Modal header={(
                    <TitleText>{selectedNote.title}</TitleText>
                )} className='dashboard__note-view-modal'
                       onClose={handleNoteViewModal}
                       style={{outlineColor: selectedNote.color}}>
                    <div
                        className='dashboard__note-view-modal__content-container'>
                        {getLatestNoteVersionByNoteID(selectedNote.id) ?? (
                            <TitleText
                                className='dashboard__note-view-modal__content-container__content--empty'>No
                                content</TitleText>
                        )}
                    </div>
                </Modal>
            )}
            <div className='dashboard__main-container'>
                <div
                    className={['dashboard__main-container__menu-container', isMenuContainerOpen ? 'dashboard__main-container__menu-container--opened' : '',
                        isMenuContainerOpen === false ? 'dashboard__main-container__menu-container--closed' : ''
                    ].join(' ')}>
                    <div
                        className='dashboard__main-container__menu-container__header-container'>
                        <div
                            className={'dashboard__main-container__menu-container__header-container__header'}>
                            <TransparentBigIconButton
                                className='dashboard__main-container__menu-container__header-container__header__button'
                                onClick={handleMenuContainerButtonClick}>chevron_left</TransparentBigIconButton>
                            <SubtitleText
                                className='dashboard__main-container__menu-container__header-container__header__subtitle'>Menu</SubtitleText>
                        </div>
                    </div>
                    <div
                        className='dashboard__main-container__menu-container__search-container'>
                    </div>
                    <div
                        className='dashboard__main-container__menu-container__views-container'>
                    </div>
                    <div
                        className='dashboard__main-container__menu-container__tags-container'>
                    </div>
                    <div
                        className='dashboard__main-container__menu-container__menu-container'>
                        <SecondaryButton onClick={handleLogOut}>Log
                            Out</SecondaryButton>
                    </div>
                </div>
                <div className='dashboard__main-container__notes-container'>
                    <div
                        className='dashboard__main-container__notes-container__header-container'>
                        <div
                            className={'dashboard__main-container__notes-container__header-container__header'}>
                            <TransparentBigIconButton
                                className='dashboard__main-container__notes-container__header-container__header__button' onClick={handleNotesContainerButtonClick}>menu</TransparentBigIconButton>
                            <SubtitleText
                                className='dashboard__main-container__notes-container__header-container__header__subtitle'>Notes</SubtitleText>
                        </div>
                        <CircularBigIconButton
                            onClick={handleNoteCreationModal}>
                            add
                        </CircularBigIconButton>
                    </div>

                    <div
                        className='dashboard__main-container__notes-container__content-container'>
                        <div
                            className='dashboard__main-container__notes-container__content-container__content'>
                            {notes.map((note) => (
                                <Note key={note.id} id={note.id}
                                      title={note.title}
                                      color={selectedNote?.id !== note.id && note.color}
                                      onEdit={handleEditNote}
                                      onView={handleNoteViewModal}
                                      onDelete={handleNoteDeletionModal}
                                      className='dashboard__main-container__notes-container__content-container__content__note'>
                                    {selectedNoteContent?? ''}
                                </Note>
                            ))}
                        </div>
                    </div>
                </div>
                <div
                    className={['dashboard__main-container__note-container', isNoteContainerOpen ? 'dashboard__main-container__note-container--opened' : '',
                        isNoteContainerOpen === false ? 'dashboard__main-container__note-container--closed' : ''
                    ].join(' ')}>
                    <div
                        className='dashboard__main-container__note-container__header-container'>
                        <div
                            className={'dashboard__main-container__note-container__header-container__header'}>
                            <TransparentBigIconButton
                                className='dashboard__main-container__note-container__header-container__header__button'
                                onClick={handleNoteContainerButtonClick}>chevron_left</TransparentBigIconButton>
                            <SubtitleText
                                className='dashboard__main-container__note-container__header-container__header__subtitle'>
                                {selectedNote ? selectedNote.title : 'Note'}
                            </SubtitleText>
                        </div>
                    </div>
                    <div className='dashboard__main-container__note-container__content-container'>
                        <TextArea id="note-content" name="note-content"
                               onChange={handleNoteChange}
                               onBlur={handleNoteBlur}
                            value={selectedNoteContent??''}>
                        </TextArea>
                    </div>
                </div>
            </div>
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