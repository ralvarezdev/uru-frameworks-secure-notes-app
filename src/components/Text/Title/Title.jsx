// Title component
function Title({className, children, ...props}) {
    return (
        <h1 className={['title', className].join(' ')} {...props}>
            {children}
        </h1>
    )
}

export default Title;