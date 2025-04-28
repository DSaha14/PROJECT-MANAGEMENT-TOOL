import React, { useEffect, useState } from 'react';
import { fetchTasks, createTask, updateTaskStatus } from '../services/api';
import { useParams } from 'react-router-dom';

function ProjectDetails() {
    const { id } = useParams();
    const [tasks, setTasks] = useState([]);
    const [taskForm, setTaskForm] = useState({ name: '', assignedTo: '', deadline: '' });

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        const res = await fetchTasks(id);
        setTasks(res.data);
    };

    const handleTaskChange = (e) => {
        setTaskForm({ ...taskForm, [e.target.name]: e.target.value });
    };

    const handleTaskSubmit = async (e) => {
        e.preventDefault();
        await createTask({ ...taskForm, projectId: id });
        loadTasks();
        setTaskForm({ name: '', assignedTo: '', deadline: '' });
    };

    const handleStatusUpdate = async (taskId, status) => {
        await updateTaskStatus(taskId, status);
        loadTasks();
    };

    return (
        <div className="container my-5">
            <h2 className="text-center fw-bold mb-4">📋 Manage Tasks</h2>

            <form onSubmit={handleTaskSubmit} className="card p-4 shadow-sm mb-5">
                <div className="row g-3">
                    <div className="col-md-4">
                        <input
                            className="form-control"
                            name="name"
                            placeholder="Task Name"
                            value={taskForm.name}
                            onChange={handleTaskChange}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <input
                            className="form-control"
                            name="assignedTo"
                            placeholder="Assign To"
                            value={taskForm.assignedTo}
                            onChange={handleTaskChange}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <input
                            className="form-control"
                            type="date"
                            name="deadline"
                            value={taskForm.deadline}
                            onChange={handleTaskChange}
                            required
                        />
                    </div>
                </div>
                <div className="d-flex justify-content-center mt-4">
                    <button className="btn btn-success px-5" type="submit">➕ Add Task</button>
                </div>
            </form>

            <div className="row g-4">
                {tasks.map((t) => (
                    <div className="col-md-6 col-lg-4" key={t._id}>
                        <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '20px' }}>
                            <div className="card-body d-flex flex-column">
                                <h5 className="fw-bold">{t.name}</h5>
                                <p className="text-muted mb-1">👤 Assigned To: {t.assignedTo}</p>
                                <p className="text-muted mb-1">📅 Deadline: {new Date(t.deadline).toLocaleDateString()}</p>
                                <p className="mt-2"><span className="fw-semibold">Status:</span> {t.status}</p>

                                <div className="mt-auto d-flex flex-column gap-2">
                                    <button
                                        className="btn btn-outline-info"
                                        onClick={() => handleStatusUpdate(t._id, 'In Progress')}
                                    >
                                        🚀 Mark as In Progress
                                    </button>
                                    <button
                                        className="btn btn-outline-success"
                                        onClick={() => handleStatusUpdate(t._id, 'Completed')}
                                    >
                                        ✅ Mark as Completed
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProjectDetails;
