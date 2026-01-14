'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleBackground: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        let camera: THREE.PerspectiveCamera;
        let scene: THREE.Scene;
        let renderer: THREE.WebGLRenderer;
        let materials: THREE.PointsMaterial[] = [];
        let mouseX = 0;
        let mouseY = 0;
        let windowHalfX = window.innerWidth / 2;
        let windowHalfY = window.innerHeight / 2;

        const textureLoader = new THREE.TextureLoader();
        const snowflakeTextures = [
            textureLoader.load('/img/snowflake1.png'),
            textureLoader.load('/img/snowflake2.png'),
            textureLoader.load('/img/snowflake3.png'),
            textureLoader.load('/img/snowflake4.png'),
            textureLoader.load('/img/snowflake5.png'),
        ];

        // Create star textures programmatically
        const createStarTexture = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 64;
            canvas.height = 64;
            const ctx = canvas.getContext('2d')!;

            // Draw a 5-pointed star with rounded tips and glow
            ctx.fillStyle = 'white';
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            
            // Add glow effect
            ctx.shadowBlur = 15;
            ctx.shadowColor = 'white';
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.beginPath();
            const centerX = 32;
            const centerY = 32;
            const outerRadius = 28;
            const innerRadius = 12;

            for (let i = 0; i < 5; i++) {
                const outerAngle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
                const innerAngle = ((i * 2 + 1) * Math.PI) / 5 - Math.PI / 2;

                if (i === 0) {
                    ctx.moveTo(
                        centerX + outerRadius * Math.cos(outerAngle),
                        centerY + outerRadius * Math.sin(outerAngle)
                    );
                }

                ctx.lineTo(
                    centerX + outerRadius * Math.cos(outerAngle),
                    centerY + outerRadius * Math.sin(outerAngle)
                );
                ctx.lineTo(
                    centerX + innerRadius * Math.cos(innerAngle),
                    centerY + innerRadius * Math.sin(innerAngle)
                );
            }
            ctx.closePath();

            // Use stroke with thick line to create rounded effect
            ctx.lineWidth = 8;
            ctx.strokeStyle = 'white';
            ctx.stroke();
            ctx.fill();

            const texture = new THREE.CanvasTexture(canvas);
            return texture;
        };

        const starTextures = [
            createStarTexture(),
            createStarTexture(),
            createStarTexture(),
            createStarTexture(),
        ];

        // Check if dark mode is active
        const isDarkMode = () => document.documentElement.classList.contains('dark');

        const updateTheme = () => {
            const isDark = isDarkMode();
            const bgColor = isDark ? 0x000000 : 0xFFFFFF;
            const fogColor = isDark ? 0x000000 : 0xF0F0F0;

            if (scene) {
                scene.background = new THREE.Color(bgColor);
                scene.fog = new THREE.FogExp2(fogColor, 0.0008);
            }
            if (renderer) {
                renderer.setClearColor(bgColor, 1);
            }

            // Switch between snowflakes (dark) and stars (light)
            materials.forEach((m, i) => {
                if (isDark) {
                    // Dark mode: colorful snowflakes with textures
                    m.map = snowflakeTextures[i % snowflakeTextures.length];
                    m.opacity = 0.4;
                    m.blending = THREE.AdditiveBlending;
                    m.size = [12, 10, 14, 8, 11][i];
                    const h = (360 * (i * 0.2) % 360) / 360;
                    m.color.setHSL(h, 0.6, 0.4, THREE.SRGBColorSpace);
                } else {
                    // Light mode: colorful star shapes with textures
                    m.map = starTextures[i % starTextures.length];
                    m.opacity = 0.6;
                    m.blending = THREE.NormalBlending;
                    m.size = [10, 8, 12, 9, 11][i];
                    const h = (360 * (i * 0.2) % 360) / 360;
                    m.color.setHSL(h, 0.7, 0.5, THREE.SRGBColorSpace);
                }
                m.needsUpdate = true;
            });
        };

        const init = () => {
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
            camera.position.z = 1000;

            scene = new THREE.Scene();

            const geometry = new THREE.BufferGeometry();
            const vertices = [];

            // 15% density: 562 particles (down from 3750)
            for (let i = 0; i < 562; i++) {
                const x = Math.random() * 2000 - 1000;
                const y = Math.random() * 2000 - 1000;
                const z = Math.random() * 2000 - 1000;
                vertices.push(x, y, z);
            }

            geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

            // Create colorful snowflake layers
            const parameters: [number[], any, number][] = [
                [[0.6, 1.0, 0.5], snowflakeTextures[0], 12],
                [[0.3, 1.0, 0.5], snowflakeTextures[1], 10],
                [[0.1, 1.0, 0.5], snowflakeTextures[2], 14],
                [[0.8, 1.0, 0.5], snowflakeTextures[3], 8],
                [[0.9, 1.0, 0.5], snowflakeTextures[4], 11]
            ];

            for (let i = 0; i < parameters.length; i++) {
                const color = parameters[i][0];
                const texture = parameters[i][1];
                const size = parameters[i][2];

                materials[i] = new THREE.PointsMaterial({
                    size,
                    map: texture,
                    blending: THREE.AdditiveBlending,
                    depthTest: false,
                    transparent: true,
                    opacity: 0.4
                });
                materials[i].color.setHSL(color[0], color[1], color[2], THREE.SRGBColorSpace);

                const particles = new THREE.Points(geometry, materials[i]);
                particles.rotation.x = Math.random() * 6;
                particles.rotation.y = Math.random() * 6;
                particles.rotation.z = Math.random() * 6;

                scene.add(particles);
            }

            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);

            if (containerRef.current) {
                containerRef.current.appendChild(renderer.domElement);
            }

            // Set initial theme
            updateTheme();

            window.addEventListener('resize', onWindowResize);
            window.addEventListener('pointermove', onPointerMove);

            // Listen for theme changes
            const observer = new MutationObserver(updateTheme);
            observer.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['class']
            });

            return observer;
        };

        const onWindowResize = () => {
            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        const onPointerMove = (event: PointerEvent) => {
            if (event.isPrimary === false) return;
            mouseX = event.clientX - windowHalfX;
            mouseY = event.clientY - windowHalfY;
        };

        const animate = () => {
            requestAnimationFrame(animate);
            render();
        };

        const render = () => {
            const time = Date.now() * 0.00001;
            camera.position.x += (mouseX - camera.position.x) * 0.05;
            camera.position.y += (-mouseY - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            for (let i = 0; i < scene.children.length; i++) {
                const object = scene.children[i];
                if (object instanceof THREE.Points) {
                    object.rotation.y = time * (i < 4 ? i + 1 : -(i + 1));
                    object.position.y -= 0.1;
                    if (object.position.y < -1000) object.position.y = 1000;
                }
            }

            // Continuous color rotation for colorful effect
            for (let i = 0; i < materials.length; i++) {
                const h = (360 * (i * 0.2 + time * 5) % 360) / 360;
                materials[i].color.setHSL(h, 0.6, 0.4, THREE.SRGBColorSpace);
            }

            renderer.render(scene, camera);
        };

        const observer = init();
        animate();

        return () => {
            window.removeEventListener('resize', onWindowResize);
            window.removeEventListener('pointermove', onPointerMove);
            observer?.disconnect();
            if (containerRef.current && renderer?.domElement) {
                containerRef.current.removeChild(renderer.domElement);
            }
            scene?.clear();
            renderer?.dispose();
            materials.forEach(m => m.dispose());
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[-1] pointer-events-none bg-white dark:bg-black"
        />
    );
};

export default ParticleBackground;
