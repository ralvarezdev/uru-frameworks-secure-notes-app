import './Note.css'
import ParagraphText from "../Text/Paragraph/Paragraph.jsx";
import CircularSmallIconButton from "../Button/Circular/Icon/Small/Small.jsx";
import {useCallback} from "react";
import TransparentSmallIconButton
    from "../Button/Transparent/Icon/Small/Small.jsx";

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

    // Handle note edit
    const handleEditNote = useCallback(() => {
        onEdit(id)
    }, [id, onEdit])

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
                    <TransparentSmallIconButton
                        className='note__main-container__header-container__icons-container__view'
                        style={{color}}
                        onClick={handleViewNote}>
                        visibility
                    </TransparentSmallIconButton>
                    <TransparentSmallIconButton
                        className='note__main-container__header-container__icons-container__edit'
                        style={{color}}
                        onClick={handleEditNote}>
                        edit
                    </TransparentSmallIconButton>
                    <TransparentSmallIconButton
                        className='note__main-container__header-container__icons-container__delete'
                        style={{color}}
                        onClick={handleDeleteNote}>
                        delete
                    </TransparentSmallIconButton>
                </div>
            </div>
            <div className='note__main-container__content'>
                {children}
            </div>
        </div>
    )
}