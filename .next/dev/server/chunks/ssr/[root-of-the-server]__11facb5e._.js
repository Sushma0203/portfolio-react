module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/components/ParticleBackground.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.module.js [app-ssr] (ecmascript) <locals>");
'use client';
;
;
;
const ParticleBackground = ()=>{
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!containerRef.current) return;
        let camera;
        let scene;
        let renderer;
        let materials = [];
        let mouseX = 0;
        let mouseY = 0;
        let windowHalfX = window.innerWidth / 2;
        let windowHalfY = window.innerHeight / 2;
        const textureLoader = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TextureLoader"]();
        const snowflakeTextures = [
            textureLoader.load('/img/snowflake1.png'),
            textureLoader.load('/img/snowflake2.png'),
            textureLoader.load('/img/snowflake3.png'),
            textureLoader.load('/img/snowflake4.png'),
            textureLoader.load('/img/snowflake5.png')
        ];
        // Create star textures programmatically
        const createStarTexture = ()=>{
            const canvas = document.createElement('canvas');
            canvas.width = 64;
            canvas.height = 64;
            const ctx = canvas.getContext('2d');
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
            for(let i = 0; i < 5; i++){
                const outerAngle = i * 2 * Math.PI / 5 - Math.PI / 2;
                const innerAngle = (i * 2 + 1) * Math.PI / 5 - Math.PI / 2;
                if (i === 0) {
                    ctx.moveTo(centerX + outerRadius * Math.cos(outerAngle), centerY + outerRadius * Math.sin(outerAngle));
                }
                ctx.lineTo(centerX + outerRadius * Math.cos(outerAngle), centerY + outerRadius * Math.sin(outerAngle));
                ctx.lineTo(centerX + innerRadius * Math.cos(innerAngle), centerY + innerRadius * Math.sin(innerAngle));
            }
            ctx.closePath();
            // Use stroke with thick line to create rounded effect
            ctx.lineWidth = 8;
            ctx.strokeStyle = 'white';
            ctx.stroke();
            ctx.fill();
            const texture = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasTexture"](canvas);
            return texture;
        };
        const starTextures = [
            createStarTexture(),
            createStarTexture(),
            createStarTexture(),
            createStarTexture()
        ];
        // Check if dark mode is active
        const isDarkMode = ()=>document.documentElement.classList.contains('dark');
        const updateTheme = ()=>{
            const isDark = isDarkMode();
            const bgColor = isDark ? 0x000000 : 0xFFFFFF;
            const fogColor = isDark ? 0x000000 : 0xF0F0F0;
            if (scene) {
                scene.background = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"](bgColor);
                scene.fog = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FogExp2"](fogColor, 0.0008);
            }
            if (renderer) {
                renderer.setClearColor(bgColor, 1);
            }
            // Switch between snowflakes (dark) and stars (light)
            materials.forEach((m, i)=>{
                if (isDark) {
                    // Dark mode: colorful snowflakes with textures
                    m.map = snowflakeTextures[i % snowflakeTextures.length];
                    m.opacity = 0.4;
                    m.blending = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdditiveBlending"];
                    m.size = [
                        12,
                        10,
                        14,
                        8,
                        11
                    ][i];
                    const h = 360 * (i * 0.2) % 360 / 360;
                    m.color.setHSL(h, 0.6, 0.4, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SRGBColorSpace"]);
                } else {
                    // Light mode: colorful star shapes with textures
                    m.map = starTextures[i % starTextures.length];
                    m.opacity = 0.6;
                    m.blending = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NormalBlending"];
                    m.size = [
                        10,
                        8,
                        12,
                        9,
                        11
                    ][i];
                    const h = 360 * (i * 0.2) % 360 / 360;
                    m.color.setHSL(h, 0.7, 0.5, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SRGBColorSpace"]);
                }
                m.needsUpdate = true;
            });
        };
        const init = ()=>{
            camera = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PerspectiveCamera"](75, window.innerWidth / window.innerHeight, 1, 2000);
            camera.position.z = 1000;
            scene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Scene"]();
            const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferGeometry"]();
            const vertices = [];
            // 15% density: 562 particles (down from 3750)
            for(let i = 0; i < 562; i++){
                const x = Math.random() * 2000 - 1000;
                const y = Math.random() * 2000 - 1000;
                const z = Math.random() * 2000 - 1000;
                vertices.push(x, y, z);
            }
            geometry.setAttribute('position', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](vertices, 3));
            // Create colorful snowflake layers
            const parameters = [
                [
                    [
                        0.6,
                        1.0,
                        0.5
                    ],
                    snowflakeTextures[0],
                    12
                ],
                [
                    [
                        0.3,
                        1.0,
                        0.5
                    ],
                    snowflakeTextures[1],
                    10
                ],
                [
                    [
                        0.1,
                        1.0,
                        0.5
                    ],
                    snowflakeTextures[2],
                    14
                ],
                [
                    [
                        0.8,
                        1.0,
                        0.5
                    ],
                    snowflakeTextures[3],
                    8
                ],
                [
                    [
                        0.9,
                        1.0,
                        0.5
                    ],
                    snowflakeTextures[4],
                    11
                ]
            ];
            for(let i = 0; i < parameters.length; i++){
                const color = parameters[i][0];
                const texture = parameters[i][1];
                const size = parameters[i][2];
                materials[i] = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PointsMaterial"]({
                    size,
                    map: texture,
                    blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                    depthTest: false,
                    transparent: true,
                    opacity: 0.4
                });
                materials[i].color.setHSL(color[0], color[1], color[2], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SRGBColorSpace"]);
                const particles = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Points"](geometry, materials[i]);
                particles.rotation.x = Math.random() * 6;
                particles.rotation.y = Math.random() * 6;
                particles.rotation.z = Math.random() * 6;
                scene.add(particles);
            }
            renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["WebGLRenderer"]({
                antialias: true,
                alpha: false
            });
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
                attributeFilter: [
                    'class'
                ]
            });
            return observer;
        };
        const onWindowResize = ()=>{
            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        const onPointerMove = (event)=>{
            if (event.isPrimary === false) return;
            mouseX = event.clientX - windowHalfX;
            mouseY = event.clientY - windowHalfY;
        };
        const animate = ()=>{
            requestAnimationFrame(animate);
            render();
        };
        const render = ()=>{
            const time = Date.now() * 0.00001;
            camera.position.x += (mouseX - camera.position.x) * 0.05;
            camera.position.y += (-mouseY - camera.position.y) * 0.05;
            camera.lookAt(scene.position);
            for(let i = 0; i < scene.children.length; i++){
                const object = scene.children[i];
                if (object instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Points"]) {
                    object.rotation.y = time * (i < 4 ? i + 1 : -(i + 1));
                    object.position.y -= 0.1;
                    if (object.position.y < -1000) object.position.y = 1000;
                }
            }
            // Continuous color rotation for colorful effect
            for(let i = 0; i < materials.length; i++){
                const h = 360 * (i * 0.2 + time * 5) % 360 / 360;
                materials[i].color.setHSL(h, 0.6, 0.4, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SRGBColorSpace"]);
            }
            renderer.render(scene, camera);
        };
        const observer = init();
        animate();
        return ()=>{
            window.removeEventListener('resize', onWindowResize);
            window.removeEventListener('pointermove', onPointerMove);
            observer?.disconnect();
            if (containerRef.current && renderer?.domElement) {
                containerRef.current.removeChild(renderer.domElement);
            }
            scene?.clear();
            renderer?.dispose();
            materials.forEach((m)=>m.dispose());
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "fixed inset-0 z-[-1] pointer-events-none bg-white dark:bg-black"
    }, void 0, false, {
        fileName: "[project]/src/components/ParticleBackground.tsx",
        lineNumber: 266,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = ParticleBackground;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__11facb5e._.js.map