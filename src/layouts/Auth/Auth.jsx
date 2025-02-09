import './Auth.css'
import Title from "../../components/Text/Title/Title.jsx";
import Separator from "../../components/Separator/Separator.jsx";
import GraphicText from "../../components/Logo/GraphicText/GraphicText.jsx";

// Auth layout
function Auth({title, children}) {
    return (
        <div className='main-container'>
            <div className='right-container'>
                <div className='content-container'>
                    <div className="content">
                        <div className='title-container'>
                            <Title className='title'>{title}</Title>
                            <GraphicText className='logo'/>
                        </div>
                        <Separator className='separator'/>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth