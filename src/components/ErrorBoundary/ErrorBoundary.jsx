import {Component} from 'react';
import Error from "../../pages/Error/Error.jsx";
import {IS_PROD} from "@ralvarezdev/js-mode";
import ParagraphText from "../Text/Paragraph/Paragraph.jsx";

// ErrorBoundary is a class component that catches JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of crashing the whole app
export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false, error: null, errorInfo: null};
    }

    // This lifecycle is invoked after an error has been thrown by a descendant component
    static getDerivedStateFromError(error) {
        return {hasError: true, error};
    }

    // This lifecycle is invoked after an error has been thrown by a descendant component
    componentDidCatch(error, errorInfo) {
        console.log("ErrorBoundary caught an error", error, errorInfo);
    }

    // This lifecycle is invoked after an error has been thrown by a descendant component
    render() {
        if (!this.state.hasError)
            return this.props.children;

        // Check if it's on production
        if (IS_PROD)
            return (
                <Error>
                    <ParagraphText>Something went wrong.</ParagraphText>
                    <ParagraphText>Please refresh the page or try again
                        later.</ParagraphText>
                </Error>
            );

        return (
            <Error>
                <ParagraphText>{this.state.error && this.state.error.message}</ParagraphText>
            </Error>
        );
    }
}