import './Input.css'
import Label from "../Label/Label.jsx";

// Input component
export default function Input({
                                  id,
                                  className,
                                  label,
                                  error,
                                  isOnError,
                                  children,
                                  ...props
                              }) {
    return (
        <div className='input__main-container'>
            <div className='input__main-container__input-container'>
                <Label className='input__main-container__input-container__label'
                       htmlFor={id}>{label}</Label>
                <input
                    className={['input__main-container__input-container__input', className].join(' ')}
                    id={id} {...props}/>
                {children}
            </div>
            <div
                className={['input__main-container__error-container', isOnError ? 'input__main-container__error-container--active' : ''].join(' ')}>
                {error}
            </div>
        </div>
    )
}