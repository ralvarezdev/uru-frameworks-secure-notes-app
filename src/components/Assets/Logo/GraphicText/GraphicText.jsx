import './GraphicText.css'
import GraphicLogoAsset from "../Graphic/Graphic.jsx";
import LogoText from "../../../Text/Logo/Logo.jsx";

// Graphic text logo asset component
export default function GraphicTextLogoAsset({className, ...props}) {
    return (
        <div
            className={['asset--logo--graphic-text__container', className].join(' ')} {...props}>
            <GraphicLogoAsset className='asset--logo--graphic-text__container__graphic'/>
            <LogoText className='asset--logo--graphic-text__container__text'>
                SecureNotes
            </LogoText>
        </div>
    )
}