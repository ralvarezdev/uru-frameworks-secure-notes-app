import './Input.css'
import Label from "../Label/Label.jsx";
import ErrorSmallText from "../Text/Small/Error/Error.jsx";
import ParagraphText from "../Text/Paragraph/Paragraph.jsx";

// Input component
export default function Input({
                                  id,
                                  className,
                                  label,
                                  isLabelInside = true,
                                  error,
                                  isOnError,
                                  children,
                                  style,
                                  ...props
                              }) {
    if (isLabelInside)
        return (
            <div className='input__main-container'>
                <div className='input__main-container__input-container'
                     style={style}>
                    <Label
                        className='input__main-container__input-container__label'
                        htmlFor={id}>{label}</Label>
                    <input
                        className={['input__main-container__input-container__input', className].join(' ')}
                        id={id}
                        {...props}/>
                    {children}
                </div>
                <div className='input__main-container__error-container'>
                    <ErrorSmallText active={isOnError}>
                        {error}
                    </ErrorSmallText>
                </div>
            </div>
        )

    return (
        <div className='input__main-container'>
            <ParagraphText
                className='input__main-container__label'>
                {label}
            </ParagraphText>
            <div className='input__main-container__input-container'>
                <input
                    className={['input__main-container__input-container__input', className].join(' ')}
                    id={id} {...props}/>
                {children}
            </div>
            <div className='input__main-container__error-container'>
                <ErrorSmallText active={isOnError}>
                    {error}
                </ErrorSmallText>
            </div>
        </div>
    )
}