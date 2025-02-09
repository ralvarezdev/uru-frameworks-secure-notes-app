import './Input.css'
import Label from "../Label/Label.jsx";

// Input component
function Input({
                   id,
                   className,
                   label,
                   name,
                   type,
                   placeholder,
                   children,
                   ...props
               }) {
    return (
        <div className='input-container'>
            <Label htmlFor={id}>{label}</Label>
            <div className='input-wrapper'>
            <input className={['input', 'text', className].join(' ')}
                   type={type} id={id} name={name}
                   placeholder={placeholder} {...props}/>
            {children}
            </div>
        </div>
    )
}

export default Input