import './Auth.css'
import Graphic from "../../components/Logo/Graphic/Graphic.jsx";
import Title from "../../components/Text/Title/Title.jsx";
import Separator from "../../components/Separator/Separator.jsx";
import GraphicText from "../../components/Logo/GraphicText/GraphicText.jsx";

// Auth layout
function Auth({title, children}) {
    return (
        <div className='main-container'>
            <div className='left-container'>
                <img src="/key--1980x1114.webp" alt="side-image"
                     loading="lazy"
                     className={'side-image'}/>
            </div>
            <div className='right-container'>
            <div className='content-container'>
                <div className='title-container'>
                    <Title className='title'>{title}</Title>
                    <GraphicText className='logo'/>
                </div>
                <Separator className='separator'/>
                {children}
            </div>
            </div>
        </div>
    )
}

export default Auth