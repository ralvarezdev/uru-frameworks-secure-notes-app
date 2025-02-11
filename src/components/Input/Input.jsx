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
                   placeholder,
                   children,
                   ...props
               }) {
    return (
        <div className='input-container'>
            <div className='input-wrapper'>
                <Label className='input__label' htmlFor={id}>{label}</Label>
                <input className={['input', 'text', className].join(' ')}
                       type={type} id={id} name={name}
                       placeholder={placeholder} {...props}/>
                {children}
            </div>
            <div
                className={['error-text', 'error-message', error && 'error-message--active'].join(' ')}>
                {error}
            </div>
        </div>
    )
}