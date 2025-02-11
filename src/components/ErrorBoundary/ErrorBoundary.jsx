import {Component} from 'react';

// ErrorBoundary is a class component that catches JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of crashing the whole app.
export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    // This lifecycle is invoked after an error has been thrown by a descendant component.
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return {hasError: true};
    }

    // This lifecycle is invoked after an error has been thrown by a descendant component.
    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    // This lifecycle is invoked after an error has been thrown by a descendant component.
    render() {
        if (!this.state.hasError)
            return this.props.children;

        return <h1>Something went wrong.</h1>;
    }
}