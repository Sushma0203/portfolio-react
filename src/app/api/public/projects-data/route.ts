import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import prisma from '@/lib/prisma';
import { serializeBigInt } from '@/lib/serialize';

export async function GET() {
    try {
        let projects = await prisma.projects.findMany({
            orderBy: { created_at: 'desc' }
        });

        if (projects.length === 0) {
            const fallbackProjects = [
                { title: 'Brain Champ', img: 'brainchamp.jpeg', desc: 'C-based quiz game with interactive learning features.', category: 'c', tech_stack: ['C'] },
                { title: 'Traffic Management System', img: 'trafficmanagementsystem.jpeg', desc: 'Real-time traffic control system using HTML, CSS, JS, and PHP.', category: 'js', tech_stack: ['HTML', 'CSS', 'JS', 'PHP'] },
                { title: 'Harati Webpage', img: 'haratiwebpage.jpeg', desc: 'Built using HTML, CSS, JS, PHP and Python for digital billing.', category: 'js', tech_stack: ['HTML', 'CSS', 'JS', 'PHP', 'Python'] },
                { title: '.NET Core Website', img: 'dotnet.png', desc: 'Full website built using .NET Core framework.', category: 'dotnet', tech_stack: ['.NET Core'] },
                { title: 'Inventory Management', img: 'inventory.jpeg', desc: 'Python + HTML/CSS/JS/PHP system with CRUD and billing.', category: 'python', tech_stack: ['Python', 'HTML', 'CSS', 'JS', 'PHP'] },
                { title: 'Gold Shop Chatbot', img: 'goldshop.jpeg', desc: 'Python + HTML/CSS/JS/PHP interactive chatbot.', category: 'python', tech_stack: ['Python', 'HTML', 'CSS', 'JS', 'PHP'] },
                { title: 'Employee Login System', img: 'employeelogin.png', desc: 'Python + HTML/CSS/JS/PHP secure login and dashboard.', category: 'python', tech_stack: ['Python', 'HTML', 'CSS', 'JS', 'PHP'] },
                { title: 'Portfolio', img: 'portfolio.jpeg', desc: 'Laravel-based portfolio site.', category: 'laravel', tech_stack: ['Laravel'] },
                { title: 'Harati System', img: 'haratisystem.jpeg', desc: 'Laravel-based inventory and billing system.', category: 'laravel', tech_stack: ['Laravel'] },
            ].map(p => ({
                title: p.title,
                image_path: 'img/project/' + p.img,
                description: p.desc,
                category: p.category,
                tech_stack: p.tech_stack
            }));
            return NextResponse.json({ projects: fallbackProjects });
        }

        return NextResponse.json({
            projects: serializeBigInt(projects)
        });
    } catch (error) {
        console.error('Error fetching projects data:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
