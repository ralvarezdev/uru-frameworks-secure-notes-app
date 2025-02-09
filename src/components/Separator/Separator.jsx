import './Separator.css'

// Separator component
function Separator({className, ...props}) {
    return (
        <div className={['separator', className].join(' ')} {...props}/>
    )
}

export default Separator;