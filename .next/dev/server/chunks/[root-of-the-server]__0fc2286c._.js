module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/prisma.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
;
const prismaClientSingleton = ()=>{
    return new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]();
};
const prisma = globalThis.prisma ?? prismaClientSingleton();
const __TURBOPACK__default__export__ = prisma;
if ("TURBOPACK compile-time truthy", 1) globalThis.prisma = prisma;
}),
"[project]/src/lib/serialize.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "serializeBigInt",
    ()=>serializeBigInt
]);
function serializeBigInt(data) {
    if (typeof data === 'bigint') {
        return data.toString();
    }
    if (Array.isArray(data)) {
        return data.map(serializeBigInt);
    }
    if (data !== null && typeof data === 'object') {
        return Object.fromEntries(Object.entries(data).map(([key, value])=>[
                key,
                serializeBigInt(value)
            ]));
    }
    return data;
}
}),
"[project]/src/app/api/public/projects-data/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$serialize$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/serialize.ts [app-route] (ecmascript)");
;
const dynamic = 'force-dynamic';
;
;
async function GET() {
    try {
        let projects = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].projects.findMany({
            orderBy: {
                created_at: 'desc'
            }
        });
        if (projects.length === 0) {
            const fallbackProjects = [
                {
                    title: 'Brain Champ',
                    img: 'brainchamp.jpeg',
                    desc: 'C-based quiz game with interactive learning features.',
                    category: 'c',
                    tech_stack: [
                        'C'
                    ]
                },
                {
                    title: 'Traffic Management System',
                    img: 'trafficmanagementsystem.jpeg',
                    desc: 'Real-time traffic control system using HTML, CSS, JS, and PHP.',
                    category: 'js',
                    tech_stack: [
                        'HTML',
                        'CSS',
                        'JS',
                        'PHP'
                    ]
                },
                {
                    title: 'Harati Webpage',
                    img: 'haratiwebpage.jpeg',
                    desc: 'Built using HTML, CSS, JS, PHP and Python for digital billing.',
                    category: 'js',
                    tech_stack: [
                        'HTML',
                        'CSS',
                        'JS',
                        'PHP',
                        'Python'
                    ]
                },
                {
                    title: '.NET Core Website',
                    img: 'dotnet.png',
                    desc: 'Full website built using .NET Core framework.',
                    category: 'dotnet',
                    tech_stack: [
                        '.NET Core'
                    ]
                },
                {
                    title: 'Inventory Management',
                    img: 'inventory.jpeg',
                    desc: 'Python + HTML/CSS/JS/PHP system with CRUD and billing.',
                    category: 'python',
                    tech_stack: [
                        'Python',
                        'HTML',
                        'CSS',
                        'JS',
                        'PHP'
                    ]
                },
                {
                    title: 'Gold Shop Chatbot',
                    img: 'goldshop.jpeg',
                    desc: 'Python + HTML/CSS/JS/PHP interactive chatbot.',
                    category: 'python',
                    tech_stack: [
                        'Python',
                        'HTML',
                        'CSS',
                        'JS',
                        'PHP'
                    ]
                },
                {
                    title: 'Employee Login System',
                    img: 'employeelogin.png',
                    desc: 'Python + HTML/CSS/JS/PHP secure login and dashboard.',
                    category: 'python',
                    tech_stack: [
                        'Python',
                        'HTML',
                        'CSS',
                        'JS',
                        'PHP'
                    ]
                },
                {
                    title: 'Portfolio',
                    img: 'portfolio.jpeg',
                    desc: 'Laravel-based portfolio site.',
                    category: 'laravel',
                    tech_stack: [
                        'Laravel'
                    ]
                },
                {
                    title: 'Harati System',
                    img: 'haratisystem.jpeg',
                    desc: 'Laravel-based inventory and billing system.',
                    category: 'laravel',
                    tech_stack: [
                        'Laravel'
                    ]
                }
            ].map((p)=>({
                    title: p.title,
                    image_path: 'img/project/' + p.img,
                    description: p.desc,
                    category: p.category,
                    tech_stack: p.tech_stack
                }));
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                projects: fallbackProjects
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            projects: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$serialize$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serializeBigInt"])(projects)
        });
    } catch (error) {
        console.error('Error fetching projects data:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal Server Error'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0fc2286c._.js.map