'use client';

import React, { useEffect, useRef } from 'react';

interface StarsProps {
    count?: number;
    className?: string;
    style?: React.CSSProperties;
}

export default function Stars({ count = 80, className = 'stars', style = {} }: StarsProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.innerHTML = '';

        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            const isFooter = className.includes('footer-stars');
            star.classList.add(isFooter ? 'footer-star' : 'star');
            star.style.top = Math.random() * 100 + '%';
            star.style.left = Math.random() * 100 + '%';

            const size = Math.random() * 2 + 1;
            star.style.width = star.style.height = size + 'px';

            star.style.animationDuration = (Math.random() * 3 + 2) + 's';
            if (isFooter) {
                star.style.animationDuration += ', ' + (Math.random() * 4 + 2) + 's';
            }

            container.appendChild(star);
        }

        const handleMouseMove = (e: MouseEvent) => {
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
