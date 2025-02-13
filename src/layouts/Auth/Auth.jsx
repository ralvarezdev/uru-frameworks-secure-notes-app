import './Auth.css'
import TitleText from "../../components/Text/Title/Title.jsx";
import Separator from "../../components/Separator/Separator.jsx";
import GraphicText from "../../components/Logo/GraphicText/GraphicText.jsx";
import Form from "../../components/Form/Form.jsx";
import MemoizedReference from "../../components/Reference/ReferenceMemo.jsx";

// Authentication layout
export default function Auth({action, titleText, footer, children}) {
    return (
        <div className='auth__main-container'>
            <div className='auth__main-container__right-container'>
                <div
                    className='auth__main-container__right-container__content-container'>
                    <div
                        className='auth__main-container__right-container__content-container__title-container'>
                        <TitleText
                            className='auth__main-container__right-container__content-container__title-container__title'>{titleText}</TitleText>
                        <GraphicText className='logo'/>
                    </div>

                    <Separator
                        className='auth__main-container__right-container__content-container__separator'/>

                    <Form
                        className='auth__main-container__right-container__content-container__form'
                        method='post' action={action}>
                        {children}
                    </Form>

                    <ul className='auth__main-container__right-container__content-container__footer-container'>
                        {footer.map((footerItem, index) => (
                            <li key={index}
                                className='auth__main-container__right-container__content-container__footer-container__item'>
                                <MemoizedReference to={footerItem.to ?? null}
                                           text={footerItem.text ?? null}>
                                    {footerItem.children ?? null}
                                </MemoizedReference>
                            </li>)
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}