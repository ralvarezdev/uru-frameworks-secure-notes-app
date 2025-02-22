import './Home.css'
import TransparentIconButton
    from "../../components/Button/Transparent/Icon/Icon.jsx";
import {useCallback, useState} from "react";
import {useNotes} from "../../context/Notes.jsx";
import Note from "../../components/Note/Note.jsx";
import SubtitleText from "../../components/Text/Subtitle/Subtitle.jsx";
import CircularIconButton from "../../components/Button/Circular/Icon/Icon.jsx";

// Home layout
export default function Home({menu}) {
    const [isMenuContainerOpen, setIsMenuContainerOpen] = useState(null);
    const [isNoteContainerOpen, setIsNoteContainerOpen] = useState(null);
    const {notes, getLatestNote,getLatestNoteVersionByNoteID} = useNotes();
    const [openNote, setOpenNote] = useState(getLatestNote);

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

    return (
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
                    <CircularIconButton>
                    add
                    </CircularIconButton>
                </div>

                {notes.map((note) => (
                <Note key={note.id} className='home__main-container__notes-container__note'>
                    {getLatestNoteVersionByNoteID(note.id).content}
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
    )
}