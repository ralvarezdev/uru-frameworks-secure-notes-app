import './FadeOut.css';
import {useCallback, useEffect, useRef, useState} from 'react';

// Fade out component
export default function FadeOutComponent({ children, duration,  animationDuration, interrupt,onAnimationEnd, ...props }) {
    const [isVisible, setIsVisible] = useState(true);
    const visibleTimerRef = useRef(null);
    const animationTimerRef = useRef(null);

    // Set timeout to hide the component after the duration
    const hideComponent = useCallback(() => {
        setIsVisible(false);
        animationTimerRef.current = setTimeout(() => {
            onAnimationEnd();
        }, animationDuration);
    }, [animationDuration, onAnimationEnd]);

    // Set timeout to hide the component after the duration
    useEffect(() => {
        // Clear timeout when the component is interrupted
        if (interrupt) {
            hideComponent();
            return;
        }

        // Set timeout to hide the component after the duration
        visibleTimerRef.current = setTimeout(() => {
            hideComponent();
        }, duration);

        return () => clearTimeout(visibleTimerRef.current);
    }, [interrupt, duration, hideComponent]);

    return (
        <div className={['fade-out', isVisible?'':'fade-out--hidden'].join(' ')} {...props}>
            {children}
        </div>
    );
}