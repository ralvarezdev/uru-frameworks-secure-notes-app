import './ColorPalette.css'
import ParagraphText from "../Text/Paragraph/Paragraph.jsx";
import CircularButton from "../Button/Circular/Circular.jsx";
import {useCallback, useState} from "react";
import ErrorSmallText from "../Text/Small/Error/Error.jsx";

// Color palette component
export default function ColorPalette({colors, onSelectedColor, isOnError, error})
{
    const [selectedColor, setSelectedColor] = useState(null)

    // Handle color button click
    const handleColorButtonClick=useCallback((event)=>{
        // Get the color
        const color= event.target.attributes.color.value

        // Update the selected color
        setSelectedColor(color)
        onSelectedColor(color)
    }, [setSelectedColor, onSelectedColor])

    return (
        <div className='color-palette__main-container'>
            <ParagraphText
                className='color-palette__main-container__text'>
                Select a color
            </ParagraphText>
            <div
                className='color-palette__main-container__colors-container'>
                {colors.map((color) =>
                    <CircularButton key={color} color={color} className={['color-palette__main-container__colors-container__color', color === selectedColor ? 'color-palette__main-container__colors-container__color--selected' : ''].join(' ')}
                                    style={{backgroundColor: color}}
                                    onClick={handleColorButtonClick}/>
                )}
            </div>
            <div className='input__main-container__error-container'>
                <ErrorSmallText active={isOnError}>
                    {error}
                </ErrorSmallText>
            </div>
        </div>
    )
}