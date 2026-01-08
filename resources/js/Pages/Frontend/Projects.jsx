import React, { useState, useEffect } from 'react';
import MainLayout from '../../Layouts/MainLayout';
import axios from 'axios';

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        axios.get('/api/projects-data')
            .then(res => {
                setProjects(res.data.projects || []);
                setFilteredProjects(res.data.projects || []);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (filter === 'all') {
            setFilteredProjects(projects);
        } else {
            setFilteredProjects(projects.filter(p => p.category === filter));
        }
    }, [filter, projects]);

    const openModal = (project) => {
        setSelectedProject(project);
    };

    const closeModal = () => {
        setSelectedProject(null);
    };

    const filters = [
        { id: 'all', label: 'All' },
        { id: 'laravel', label: 'Laravel' },
        { id: 'python', label: 'Python' },
        { id: 'js', label: 'HTML/CSS/JS' },
        { id: 'c', label: 'C' },
        { id: 'dotnet', label: '.NET Core' },
    ];

    if (loading) return <MainLayout title="Projects"><div>Loading...</div></MainLayout>;

    return (
        <MainLayout title="Projects">
            <style>{`
                .project-card {
                    border-radius: 20px;
                    overflow: hidden;
                    background: rgba(255,255,255,0.95);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }
                .project-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.25);
                }
                .card-img {
                    position: relative;
                    width: 100%;
                    height: 250px;
                    overflow: hidden;
                }
                .card-img img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .overlay {
                    position: absolute;
                    top:0; left:0; width:100%; height:100%;
                    background: rgba(0,0,0,0.65);
                    color:#fff; display:flex; justify-content:center; align-items:center;
                    opacity:0; transition: opacity 0.3s ease;
                }
                .card-img:hover .overlay { opacity:1; }
                .fade-in { animation: fadeInUp 0.6s ease forwards; }
                @keyframes fadeInUp { from { opacity:0; transform: translateY(30px); } to { opacity:1; transform: translateY(0); } }
                
                .modal-backdrop-custom {
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    background: rgba(0,0,0,0.5); z-index: 1050; display: flex; justify-content: center; align-items: center;
                }
                .modal-content-custom {
                    background: white; padding: 20px; border-radius: 10px; width: 90%; max-width: 800px;
                    position: relative; z-index: 1055; animation: slideDown 0.3s ease;
                }
                @keyframes slideDown { from { transform: translateY(-50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
            `}</style>

            <div className="container py-5">
                <h2 className="fw-bold text-center mb-5 fade-in">My Projects</h2>

                <div className="text-center mb-5">
                    {filters.map(f => (
                        <button
                            key={f.id}
                            className={`btn btn-outline-primary mx-1 ${filter === f.id ? 'active' : ''}`}
                            onClick={() => setFilter(f.id)}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                <div className="row g-4">
                    {filteredProjects.map((project, index) => (
                        <div key={index} className="col-lg-6 col-md-12 fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="project-card shadow-lg">
                                <div className="card-img">
                                    <img src={`/${project.image_path}`} alt={project.title} />
                                    <div className="overlay">
                                        <button className="btn btn-light btn-lg" onClick={() => openModal(project)}>
                                            <i className="bi bi-eye me-2"></i>View Details
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body p-4 flex-grow-1 d-flex flex-column justify-content-between">
                                    <div>
                                        <h4 className="fw-bold">{project.title}</h4>
                                        <p className="small mb-3">{project.description}</p>
                                    </div>
                                    <div className="tech-badges mt-3">
                                        {(project.tech_stack || []).map((tech, i) => (
                                            <span key={i} className="badge bg-primary me-1 mb-1">{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedProject && (
                <div className="modal-backdrop-custom" onClick={closeModal}>
                    <div className="modal-content-custom text-center" onClick={e => e.stopPropagation()}>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="modal-title fw-bold">{selectedProject.title}</h5>
                            <button type="button" className="btn-close" onClick={closeModal}></button>
                        </div>
                        <img src={`/${selectedProject.image_path}`} className="img-fluid rounded mb-3" alt={selectedProject.title} style={{ maxHeight: '400px', objectFit: 'contain' }} />
                        <p>{selectedProject.description}</p>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}
