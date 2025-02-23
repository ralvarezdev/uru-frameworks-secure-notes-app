import './TextArea.css'

// Text area component
export default function TextArea({resize='none', ...props}) {
    return (
        <div className='text-area__main-container'>
            <textarea className='text-area__main-container__area' style={{resize}} {...props}/>
        </div>
    )
}