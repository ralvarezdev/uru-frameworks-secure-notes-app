import './Title.css';

// Title text component
export default function TitleText({className, children, ...props}) {
    return (
        <h1 className={['text--title', className].join(' ')} {...props}>
            {children}
        </h1>
    )
}