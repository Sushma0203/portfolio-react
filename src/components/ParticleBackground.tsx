'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleBackground: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // --- Configuration ---
        let camera: THREE.PerspectiveCamera;
        let scene: THREE.Scene;
        let renderer: THREE.WebGLRenderer;
        let materials: THREE.PointsMaterial[] = [];
        let mouseX = 0;
        let mouseY = 0;
        let windowHalfX = window.innerWidth / 2;
        let windowHalfY = window.innerHeight / 2;

        const init = () => {
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
            camera.position.z = 1000;

            scene = new THREE.Scene();
            scene.fog = new THREE.FogExp2(0x000000, 0.0008);

            const geometry = new THREE.BufferGeometry();
            const vertices = [];

            // Create 10,000 random points
            for (let i = 0; i < 10000; i++) {
                const x = Math.random() * 2000 - 1000;
                const y = Math.random() * 2000 - 1000;
                const z = Math.random() * 2000 - 1000;
                vertices.push(x, y, z);
            }

            geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

            // Create a simple circular sprite since snowflakes are missing
            const createCircleTexture = () => {
                const canvas = document.createElement('canvas');
                canvas.width = 64;
                canvas.height = 64;
                const context = canvas.getContext('2d');
                if (context) {
                    const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
                    gradient.addColorStop(0, 'rgba(255,255,255,1)');
                    gradient.addColorStop(0.2, 'rgba(255,255,255,0.8)');
                    gradient.addColorStop(0.4, 'rgba(255,255,255,0.2)');
                    gradient.addColorStop(1, 'rgba(255,255,255,0)');
                    context.fillStyle = gradient;
                    context.fillRect(0, 0, 64, 64);
                }
                const texture = new THREE.CanvasTexture(canvas);
                texture.colorSpace = THREE.SRGBColorSpace;
                return texture;
            };

            const circleTexture = createCircleTexture();

            const parameters = [
                [[1.0, 0.2, 0.5], 20],
                [[0.95, 0.1, 0.5], 15],
                [[0.90, 0.05, 0.5], 10],
                [[0.85, 0, 0.5], 8],
                [[0.80, 0, 0.5], 5]
            ];

            for (let i = 0; i < parameters.length; i++) {
                const color = parameters[i][0] as number[];
                const size = parameters[i][1] as number;

                materials[i] = new THREE.PointsMaterial({
                    size,
                    map: circleTexture,
                    blending: THREE.AdditiveBlending,
                    depthTest: false,
                    transparent: true,
                    opacity: 0.8
                });
                materials[i].color.setHSL(color[0], color[1], color[2], THREE.SRGBColorSpace);

                const particles = new THREE.Points(geometry, materials[i]);
                particles.rotation.x = Math.random() * 6;
                particles.rotation.y = Math.random() * 6;
                particles.rotation.z = Math.random() * 6;

                scene.add(particles);
            }

            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor(0x000000, 1);

            if (containerRef.current) {
                containerRef.current.appendChild(renderer.domElement);
            }

            window.addEventListener('resize', onWindowResize);
            window.addEventListener('pointermove', onPointerMove);
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
            const time = Date.now() * 0.00005;

            camera.position.x += (mouseX - camera.position.x) * 0.05;
            camera.position.y += (-mouseY - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            for (let i = 0; i < scene.children.length; i++) {
                const object = scene.children[i];
                if (object instanceof THREE.Points) {
                    object.rotation.y = time * (i < 4 ? i + 1 : -(i + 1));
                }
            }

            for (let i = 0; i < materials.length; i++) {
                const color = materials[i].color.getHSL({ h: 0, s: 0, l: 0 });
                const h = (360 * (color.h + time) % 360) / 360;
                materials[i].color.setHSL(h, color.s, color.l, THREE.SRGBColorSpace);
            }

            renderer.render(scene, camera);
        };

        init();
        animate();

        return () => {
            window.removeEventListener('resize', onWindowResize);
            window.removeEventListener('pointermove', onPointerMove);
            if (containerRef.current && renderer.domElement) {
                containerRef.current.removeChild(renderer.domElement);
            }
            // Disposal
            scene?.clear();
            renderer?.dispose();
            materials.forEach(m => m.dispose());
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none',
                background: '#0a000a' // Dark space background
            }}
        />
    );
};

export default ParticleBackground;
