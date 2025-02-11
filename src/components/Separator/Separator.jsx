import './Separator.css'

// Separator component
export default function Separator({className, ...props}) {
    return (
        <div className={['separator', className].join(' ')} {...props}/>
    )
}
