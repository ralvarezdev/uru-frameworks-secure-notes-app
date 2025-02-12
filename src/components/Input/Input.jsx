import './Input.css'
import Label from "../Label/Label.jsx";

// Input component
export default function Input({
                                  id,
                                  className,
                                  label,
                                  name,
                                  type,
                                  error,
                                  isErrorActive,
                                  placeholder,
                                  children,
                                  ...props
                              }) {
    return (
        <div className='input-main-container'>
            <div className='input-container'>
                <Label className='input__label' htmlFor={id}>{label}</Label>
                <input className={['input', className].join(' ')}
                       type={type} id={id} name={name}
                       placeholder={placeholder} {...props}/>
                {children}
            </div>
            <div
                className={['input-error-container', isErrorActive ? 'input-error-container--active' : ''].join(' ')}>
                {error}
            </div>
        </div>
    )
}