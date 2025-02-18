import {useEffect, useState} from 'react';

// Timer hook
export function useTimer({onTimerEnd, timerDuration, timerInterval}) {
    const [redirectIn, setRedirectIn] = useState(timerDuration / timerInterval);
    const [isActive, setIsActive] = useState(false);

    // Handle timer
    useEffect(() => {
        if (!isActive) return;

        // Set the timer and interval
        const timer = setTimeout(onTimerEnd, timerDuration);
        const interval = setInterval(() => {
            setRedirectIn((prev) => {
                if (prev === 0)
                    return prev;
                return prev - 1;
            });
        }, timerInterval);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [isActive, timerDuration, timerInterval, onTimerEnd]);

    return {redirectIn, setIsActive};
}