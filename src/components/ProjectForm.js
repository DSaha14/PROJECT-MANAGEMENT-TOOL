import React, { useState } from 'react';
import { createProject } from '../services/api';

function ProjectForm({ onProjectCreated }) {
    const [formData, setFormData] = useState({ name: '', description: '', deadline: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createProject(formData);
        onProjectCreated();
        setFormData({ name: '', description: '', deadline: '' });
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <form onSubmit={handleSubmit} className="card p-5 shadow-sm w-100" style={{ maxWidth: '500px', borderRadius: '20px' }}>
                <h2 className="text-center mb-4 fw-bold">🚀 Create New Project</h2>

                <div className="mb-3">
                    <input
                        className="form-control"
                        name="name"
                        placeholder="Project Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <textarea
                        className="form-control"
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        required
                    ></textarea>
                </div>

                <div className="mb-4">
                    <input
                        className="form-control"
                        type="date"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button className="btn btn-primary w-100" type="submit" style={{ fontSize: '18px' }}>
                    ➕ Create Project
                </button>
            </form>
        </div>
    );
}

export default ProjectForm;
