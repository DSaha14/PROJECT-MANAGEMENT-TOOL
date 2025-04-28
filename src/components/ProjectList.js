import React, { useEffect, useState } from 'react';
import { fetchProjects, deleteProject } from '../services/api'; 
import { Link } from 'react-router-dom';

function ProjectList() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            const res = await fetchProjects();
            setProjects(res.data);
        } catch (error) {
            console.error('Failed to fetch projects:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await deleteProject(id);
                loadProjects();
            } catch (error) {
                console.error('Failed to delete project:', error);
            }
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4 fw-bold">📋 Project Dashboard</h1>
            
            <div className="d-flex justify-content-center mb-5">
                <Link to="/create" className="btn btn-success btn-lg shadow">➕ Create New Project</Link>
            </div>

            <div className="row g-4">
                {projects.map(p => (
                    <div className="col-md-6 col-lg-4" key={p._id}>
                        <div className="card shadow-lg border-0 h-100" style={{ borderRadius: '20px' }}>
                            <div className="card-body d-flex flex-column position-relative">
                                {/* Delete Icon */}
                                <button
                                    type="button"
                                    className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2 rounded-circle"
                                    style={{ width: '35px', height: '35px', padding: '0', fontSize: '18px' }}
                                    onClick={() => handleDelete(p._id)}
                                    title="Delete Project"
                                >
                                    🗑️
                                </button>

                                <h3 className="card-title fw-bold mt-2">{p.name}</h3>
                                {p.description && (
                                    <p className="card-text text-muted mt-2">
                                        {p.description.length > 100 ? p.description.substring(0, 100) + '...' : p.description}
                                    </p>
                                )}
                                <div className="mt-auto">
                                    <Link to={`/project/${p._id}`} className="btn btn-primary w-100 mt-3" style={{ borderRadius: '12px' }}>
                                        🔎 View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProjectList;
