import './Message.css'
import BackgroundAsset from "../../components/Assets/Background/Background.jsx";
import TitleText from "../../components/Text/Title/Title.jsx";
import GraphicTextLogoAsset
    from "../../components/Assets/Logo/GraphicText/GraphicText.jsx";
import GraphicLogoAsset from "../../components/Assets/Logo/Graphic/Graphic.jsx";
import Modal from "../../components/Modal/Modal.jsx";

// Message layout
export default function MessageLayout({title, children, className, ...props}) {
    return (
        <div className='message__main-container'>
            <BackgroundAsset className='message__main-container__background'/>
            <Modal header={(
                <div
                    className='message__main-container__modal__title-container'>
                    <TitleText>{title}</TitleText>
                    <GraphicTextLogoAsset className='logo--graphic-text'/>
                    <GraphicLogoAsset className='logo--graphic'/>
                </div>
            )}
                   className={['message__main-container__modal', className].join(' ')} {...props}>
                <div
                    className='message__main-container__modal__content'>
                    {children}
                </div>
            </Modal>
        </div>
    )
}