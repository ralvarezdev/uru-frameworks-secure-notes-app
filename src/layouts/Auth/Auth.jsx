import './Auth.css'
import TitleText from "../../components/Text/Title/Title.jsx";
import Separator from "../../components/Separator/Separator.jsx";
import Form from "../../components/Form/Form.jsx";
import MemoizedReference from "../../components/Reference/ReferenceMemo.jsx";
import GraphicTextLogoAsset
    from "../../components/Assets/Logo/GraphicText/GraphicText.jsx";
import BackgroundAsset from "../../components/Assets/Background/Background.jsx";
import GraphicLogoAsset from "../../components/Assets/Logo/Graphic/Graphic.jsx";

// Auth layout
export default function Auth({
                                 titleText,
                                 footer,
                                 children,
                                 isOnError,
                                 setIsOnError,
                                 onSubmit,
                                 isSubmitting,
                             }) {
    return (
        <div className='auth__main-container'>
            <BackgroundAsset className='auth__main-container__background'/>
            <div className='auth__main-container__right-container'>
                <GraphicTextLogoAsset
                    className='auth__main-container__right-container__logo--graphic-text asset--logo--graphic-text__container--right'/>
                <div
                    className='auth__main-container__right-container__content-container'>
                    <div
                        className='auth__main-container__right-container__content-container__title-container'>
                        <TitleText
                            className='auth__main-container__right-container__content-container__title-container__title'>{titleText}</TitleText>
                        <GraphicTextLogoAsset
                            className='auth__main-container__right-container__content-container__title-container__logo--graphic-text'/>
                        <GraphicLogoAsset
                            className='auth__main-container__right-container__content-container__title-container__logo--graphic'/>
                    </div>

                    <Separator
                        className='auth__main-container__right-container__content-container__separator'/>

                    <Form
                        className='auth__main-container__right-container__content-container__form'
                        method='post'
                        isOnError={isOnError}
                        setIsOnError={setIsOnError}
                        isSubmitting={isSubmitting}
                        onSubmit={onSubmit}>
                        {children}
                    </Form>

                    <ul className='auth__main-container__right-container__content-container__footer-container'>
                        {footer.map((footerItem, index) => {
                                if (footerItem) {
                                    return (
                                        <li key={index}
                                            className='auth__main-container__right-container__content-container__footer-container__item'>
                                            <MemoizedReference
                                                onClick={footerItem.onClick ?? null}
                                                to={footerItem.to ?? null}
                                                text={footerItem.text ?? null}>
                                                {footerItem.children ?? null}
                                            </MemoizedReference>
                                        </li>
                                    )
                                }
                                return null
                            }
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}