import './Note.css'
import ParagraphText from "../Text/Paragraph/Paragraph.jsx";
import CircularSmallIconButton from "../Button/Circular/Icon/Small/Small.jsx";
import {useCallback} from "react";

// Note component
export default function Note({
                                 id,
                                 onView,
                                 onEdit,
                                 onDelete,
                                 color,
                                 title,
                                 children,
                                 className,
                                 content,
                                 ...props
                             }) {
    // Handle note deletion
    const handleDeleteNote = useCallback(() => {
        onDelete(id)
    }, [id, onDelete])

    // Handle note view
    const handleViewNote = useCallback(() => {
        onView(id)
    }, [id, onView])

    //

    return (
        <div className={['note__main-container', className].join(' ')}
             style={{borderColor: color}} {...props}>
            <div className='note__main-container__header-container'>
                <div
                    className='note__main-container__header-container__header'>
                    <ParagraphText>{title}</ParagraphText>
                </div>
                <div
                    className='note__main-container__header-container__icons-container'>
                    <CircularSmallIconButton
                        className='note__main-container__header-container__icons-container__view'
                        style={{backgroundColor: color}}
                        onClick={handleViewNote}>
                        visibility
                    </CircularSmallIconButton>
                    <CircularSmallIconButton
                        className='note__main-container__header-container__icons-container__edit'
                        style={{backgroundColor: color}}
                        onClick={onEdit}>
                        edit
                    </CircularSmallIconButton>
                    <CircularSmallIconButton
                        className='note__main-container__header-container__icons-container__delete'
                        style={{backgroundColor: color}}
                        onClick={handleDeleteNote}>
                        delete
                    </CircularSmallIconButton>
                </div>
            </div>
            <div className='note__main-container__content'>
                {children}
            </div>
        </div>
    )
}