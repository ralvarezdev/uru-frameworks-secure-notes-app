import './Title.css';

// Title component
export default function Title({className, children, ...props}) {
    return (
        <h1 className={['title', className].join(' ')} {...props}>
            {children}
        </h1>
    )
}