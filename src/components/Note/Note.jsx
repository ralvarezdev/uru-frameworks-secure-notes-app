import './Note.css'
import ParagraphText from "../Text/Paragraph/Paragraph.jsx";
import CircularIconButton from "../Button/Circular/Icon/Icon.jsx";
import {useCallback} from "react";

// Note component
export default function Note({id, onEdit, onDelete, color, title, children, className, content, ...props}) {
    // Handle note deletion
    const handleDeleteNote=useCallback(()=>{
      onDelete(id)
    }, [id, onDelete])

    return (
        <div className={['note__main-container', className].join(' ')}
             style={{borderColor: color}} {...props}>
            <div className='note__main-container__header-container'>
                <div
                    className='note__main-container__header-container__header'>
                    <ParagraphText>{title}</ParagraphText>
                </div>
                <div className='note__main-container__header-container__icons-container'>
                    <CircularIconButton className='note__main-container__header-container__icons-container__edit' style={{backgroundColor:color}} onClick={onEdit}>
                        edit
                    </CircularIconButton>
                    <CircularIconButton className='note__main-container__header-container__icons-container__delete' style={{backgroundColor:color}} onClick={handleDeleteNote}>
                        delete
                    </CircularIconButton>
                </div>
            </div>
            <div className='note__main-container__content'>
                {children}
            </div>
        </div>
    )
}