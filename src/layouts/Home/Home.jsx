import './Home.css'
import TransparentIconButton
    from "../../components/Button/Transparent/Icon/Icon.jsx";
import {useState} from "react";

// Home layout
export default function Home({settings}) {
    const [isMenuOpen, setIsMenuOpen] = useState(null);
    const [isNotesOpen, setIsNotesOpen] = useState(null);

    // Handle the menu button click
    function handleMenuButtonClick() {
        setIsMenuOpen((prevState) => !prevState);
    }

    // Handle the notes button click
    function handleNotesButtonClick() {
        setIsNotesOpen((prevState) => !prevState);
    }

    return (
        <div className='home__main-container'>
            <div className={['home__main-container__menu-container', isMenuOpen ? 'home__main-container__menu-container--opened' : '',
            isMenuOpen===false ? 'home__main-container__menu-container--closed' : ''
            ].join(' ')}>
                <TransparentIconButton className='home__main-container__menu-container__menu-button' onClick={handleMenuButtonClick}>chevron_left</TransparentIconButton>
                <div className='home__main-container__menu-container__search-container'>
                </div>
                <div className='home__main-container__menu-container__views-container'>
                </div>
                <div className='home__main-container__menu-container__tags-container'>
                </div>
                <div className='home__main-container__menu-container__settings-container'>
                    {settings}
                </div>
            </div>
            <div className='home__main-container__notes-container'>
                <TransparentIconButton className='home__main-container__notes-container__menu-button' onClick={handleMenuButtonClick}>menu</TransparentIconButton>
                <button onClick={handleNotesButtonClick}>Note</button>
            </div>
            <div
                className={['home__main-container__note-container', isNotesOpen ? 'home__main-container__note-container--opened' : '',
                isNotesOpen===false ? 'home__main-container__note-container--closed' : ''
                ].join(' ')}>
                <TransparentIconButton className='home__main-container__note-container__notes-button' onClick={handleNotesButtonClick}>chevron_left</TransparentIconButton>
            </div>
        </div>
    )
}