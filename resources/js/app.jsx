import './bootstrap';
import '../css/app.css';
import '../css/admin.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from './Layouts/MainLayout';
import AdminLayout from './Layouts/AdminLayout';

// Frontend Pages
import Home from './Pages/Frontend/Home';
import About from './Pages/Frontend/About';
import Contact from './Pages/Frontend/Contact';
import Gallery from './Pages/Frontend/Gallery';
import Projects from './Pages/Frontend/Projects';

// Auth
import Login from './Pages/Auth/Login';

// Admin Pages
import Dashboard from './Pages/Admin/Dashboard';
import GalleryIndex from './Pages/Admin/Gallery/Index';
import GalleryCreate from './Pages/Admin/Gallery/Create';
import ProjectIndex from './Pages/Admin/Projects/Index';
import ProjectCreate from './Pages/Admin/Projects/Create';
import ProjectEdit from './Pages/Admin/Projects/Edit';
import MessageIndex from './Pages/Admin/Messages/Index';
import MessageShow from './Pages/Admin/Messages/Show';
import HomeEdit from './Pages/Admin/Home/Edit';
import AboutEdit from './Pages/Admin/About/Edit';
import ChatbotIndex from './Pages/Admin/Chatbot/Index';
import ChatbotCreate from './Pages/Admin/Chatbot/Create';
import ChatbotEdit from './Pages/Admin/Chatbot/Edit';

import axios from 'axios';

// Configure Axios
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('admin_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const rootElement = document.getElementById('app');
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/projects" element={<Projects />} />

                {/* Auth */}
                <Route path="/login" element={<Login />} />
                <Route path="/admin/login" element={<Navigate to="/login" />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/home" element={<HomeEdit />} />
                <Route path="/admin/about" element={<AboutEdit />} />

                <Route path="/admin/gallery" element={<GalleryIndex />} />
                <Route path="/admin/gallery/create" element={<GalleryCreate />} />

                <Route path="/admin/projects" element={<ProjectIndex />} />
                <Route path="/admin/projects/create" element={<ProjectCreate />} />
                <Route path="/admin/projects/:id/edit" element={<ProjectEdit />} />

                <Route path="/admin/messages" element={<MessageIndex />} />
                <Route path="/admin/messages/:id" element={<MessageShow />} />

                <Route path="/admin/chatbot" element={<ChatbotIndex />} />
                <Route path="/admin/chatbot/create" element={<ChatbotCreate />} />
                <Route path="/admin/chatbot/:id/edit" element={<ChatbotEdit />} />

                {/* Catch all */}
                <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
        </BrowserRouter>
    );
}
