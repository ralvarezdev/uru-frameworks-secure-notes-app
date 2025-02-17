import './Modal.css'
import BackgroundAsset from "../../components/Assets/Background/Background.jsx";
import TitleText from "../../components/Text/Title/Title.jsx";
import GraphicTextLogoAsset
    from "../../components/Assets/Logo/GraphicText/GraphicText.jsx";
import GraphicLogoAsset from "../../components/Assets/Logo/Graphic/Graphic.jsx";
import Separator from "../../components/Separator/Separator.jsx";
import Modal from "../../components/Modal/Modal.jsx";

// Modal layout
export default function ModalLayout({title, children, className, ...props}) {
    return (
        <div className='modal__main-container'>
            <BackgroundAsset className='modal__main-container__background'/>
            <Modal className={className} {...props}>
                <div
                    className='modal__main-container__content-container__title-container'>
                    <TitleText
                        className='modal__main-container__content-container__title-container__title'>
                        {title}
                    </TitleText>
                    <GraphicTextLogoAsset className='logo--graphic-text'/>
                    <GraphicLogoAsset className='logo--graphic'/>
                </div>
                <Separator/>
                <div
                    className='modal__main-container__content-container__content'>
                    {children}
                </div>
            </Modal>
        </div>
    )
}