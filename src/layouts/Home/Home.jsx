import './Home.css'
import TransparentIconButton
    from "../../components/Button/Transparent/Icon/Icon.jsx";
import {useCallback, useState} from "react";
import {useNotes} from "../../context/Notes.jsx";
import Note from "../../components/Note/Note.jsx";
import SubtitleText from "../../components/Text/Subtitle/Subtitle.jsx";
import CircularIconButton from "../../components/Button/Circular/Icon/Icon.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import TitleText from "../../components/Text/Title/Title.jsx";
import {NOTE_COLORS} from "../../constants.js";
import ColorPalette from "../../components/ColorPalette/ColorPalette.jsx";
import Input from "../../components/Input/Input.jsx";
import Form from "../../components/Form/Form.jsx";
import {useMutation} from "react-query";
import {useNotification} from "../../context/Notification.jsx";

// Home layout
export default function Home({menu}) {
    const [isMenuContainerOpen, setIsMenuContainerOpen] = useState(null);
    const [isNoteContainerOpen, setIsNoteContainerOpen] = useState(null);
    const {notes, getLatestNote, getLatestNoteID,getLatestNoteVersionByNoteID,upsertNote } = useNotes();
    const [openNote, setOpenNote] = useState(getLatestNote);
    const [isCreateNoteModalOpen, setIsCreateNoteModalOpen] = useState(false);
    const [newNoteColor, setNewNoteColor] = useState(null)
    const [isOnError, setIsOnError]=useState(null)
    const {addInfoNotification} = useNotification()

    // Handle the menu container button click
    const handleMenuContainerButtonClick=useCallback(()=> {
        setIsMenuContainerOpen((prevState) => !prevState);
    },[]);

    // Handle the notes container button click
    const handleNotesContainerButtonClick = useCallback(() => {
        setIsMenuContainerOpen((prevState) => !prevState);
    }, []);

    // Handle the note container button click
    const handleNoteContainerButtonClick = useCallback(() => {
        setIsNoteContainerOpen((prevState) => !prevState);
    }, []);

    // Handle the note button click
    const handleNoteButtonClick = useCallback((id) =>{
        setOpenNote(getLatestNoteVersionByNoteID(id));
    }, [getLatestNoteVersionByNoteID]);

    // Handle the note creation modal
    const handleNoteCreationModal = useCallback(() => {
        setIsOnError(false)
        setIsCreateNoteModalOpen((prevState) => !prevState);

    }, []);
    
    // Handle the new note color
    const handleNewNoteColor = useCallback((color)=>{
        setNewNoteColor(color)
    },[])
    
    // Handle the note creation
    const handleNoteCreation=useCallback(async ({id, title, color})=>{
        // Check if the color hasn't been selected
        let failData={}
        if (!color)
            failData.color = ["Invalid color"]

        //  Check the title
        if (!title)
            failData.title= ['Invalid title']

        // Check if there are any errors
        if (Object.keys(failData).length)
            return {status: 'fail', data: failData}

        // Create note
        const currentTime = new Date()
        await upsertNote({id, title, color, created_at: currentTime, updated_at: currentTime})
        return {status:'success'}
    }, [upsertNote])

    // Create note mutation
    const createNoteMutation=useMutation(handleNoteCreation, {
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
    const handleNoteCreationSubmit=useCallback(()=>{
        //  Get the note title
        const newNoteTitle = document.querySelector('#title').value

        // Get the note ID
        const latestNoteID=getLatestNoteID()
        const noteID=latestNoteID?latestNoteID+1:1

        createNoteMutation.mutate({id: noteID, title: newNoteTitle, color:newNoteColor});
    },[createNoteMutation, getLatestNoteID, newNoteColor] )

    return (
        <>
            {isCreateNoteModalOpen&&
            <Modal header={(
                    <TitleText>New Note</TitleText>
                )} className='home__note-creation-modal' onClose={handleNoteCreationModal}>
                <Form
                        className='home__note-creation-modal__form'
                        isOnError={isOnError}
                        setIsOnError={setIsOnError}
                        onSubmit={handleNoteCreationSubmit}>
                            <Input type="text" id="title" name="title"
                                   label="Title"
                                   isLabelInside={false}
                               placeholder="Enter your title"
                               error={createNoteMutation.data?.data?.title?.[0]}
                               isOnError={isOnError}/>
                        <ColorPalette colors={NOTE_COLORS} onSelectedColor={handleNewNoteColor}
                                error={createNoteMutation.data?.data?.color?.[0]}
                                isOnError={isOnError}/>
                </Form>
            </Modal>}
            <div className='home__main-container'>
                <div
                    className={['home__main-container__menu-container', isMenuContainerOpen ? 'home__main-container__menu-container--opened' : '',
                        isMenuContainerOpen === false ? 'home__main-container__menu-container--closed' : ''
                    ].join(' ')}>
                    <div
                        className='home__main-container__menu-container__header-container'>
                        <div
                            className={'home__main-container__menu-container__header-container__header'}>
                            <TransparentIconButton
                                className='home__main-container__menu-container__header-container__header__button'
                                onClick={handleMenuContainerButtonClick}>chevron_left</TransparentIconButton>
                            <SubtitleText
                                className='home__main-container__menu-container__header-container__header__subtitle'>Menu</SubtitleText>
                        </div>
                    </div>
                    <div
                        className='home__main-container__menu-container__search-container'>
                    </div>
                    <div
                        className='home__main-container__menu-container__views-container'>
                    </div>
                    <div
                        className='home__main-container__menu-container__tags-container'>
                    </div>
                    <div
                        className='home__main-container__menu-container__menu-container'>
                        {menu}
                    </div>
                </div>
                <div className='home__main-container__notes-container'>
                    <div
                        className='home__main-container__notes-container__header-container'>
                        <div
                            className={'home__main-container__notes-container__header-container__header'}>
                            <TransparentIconButton
                                className='home__main-container__notes-container__header-container__header__button'
                                onClick={handleNotesContainerButtonClick}>menu</TransparentIconButton>
                            <SubtitleText
                                className='home__main-container__notes-container__header-container__header__subtitle'>Notes</SubtitleText>
                        </div>
                        <CircularIconButton onClick={handleNoteCreationModal}>
                        add
                        </CircularIconButton>
                    </div>

                    {notes.map((note) => (
                    <Note key={note.id} title={note.title} color={note.color} className='home__main-container__notes-container__note'>
                        {getLatestNoteVersionByNoteID(note.id)?.content ?? ''}
                    </Note>
                    ))}
                </div>
                <div
                    className={['home__main-container__note-container', isNoteContainerOpen ? 'home__main-container__note-container--opened' : '',
                        isNoteContainerOpen === false ? 'home__main-container__note-container--closed' : ''
                    ].join(' ')}>
                    <div
                        className='home__main-container__note-container__header-container'>
                        <div
                            className={'home__main-container__note-container__header-container__header'}>
                            <TransparentIconButton
                                className='home__main-container__note-container__header-container__header__button'
                                onClick={handleNoteContainerButtonClick}>chevron_left</TransparentIconButton>
                            <SubtitleText
                                className='home__main-container__note-container__header-container__header__subtitle'>
                                {openNote ? openNote.title : 'Note'}
                            </SubtitleText>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}