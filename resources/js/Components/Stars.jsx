import React, { useEffect, useRef } from 'react';

export default function Stars({ count = 100, className = 'stars', style = {} }) {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Clear existing stars if any (though React handles mounting)
        container.innerHTML = '';

        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.classList.add(className === 'footer-stars' ? 'footer-star' : 'star');
            star.style.top = Math.random() * 100 + '%';
            star.style.left = Math.random() * 100 + '%';

            // Random size differs slightly between nav and footer in original, harmonizing here
            const size = Math.random() * 2 + 1;
            star.style.width = star.style.height = size + 'px';

            // Animation duration
            star.style.animationDuration = (Math.random() * 3 + 2) + 's';
            if (className === 'footer-stars') {
                star.style.animationDuration += ', ' + (Math.random() * 4 + 2) + 's';
            }

            container.appendChild(star);
        }

        const handleMouseMove = (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            const moveScale = className === 'footer-stars' ? 20 : 30;
            container.style.transform = `translate(${x * moveScale}px, ${y * moveScale}px)`;
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [count, className]);

    return <div ref={containerRef} className={className} style={style}></div>;
}
