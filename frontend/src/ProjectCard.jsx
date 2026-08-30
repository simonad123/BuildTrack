import { useState } from "react";

function ProjectCard({ project, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(project.name);
    const [status, setStatus] = useState(project.status);
    const [isDeleting, setIsDeleting] = useState(false);

    const statusClass = project.status
        .toLowerCase()
        .replace(" ", "-");

    const handleUpdate = (event) => {
        event.preventDefault();

        onUpdate(project.id, name, status);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <form className="project-card" onSubmit={handleUpdate}>
                <div className="edit-form">
                    <input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />

                    <select
                        value={status}
                        onChange={(event) => setStatus(event.target.value)}
                    >
                        <option value="Planning">Planning</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <div className="project-card-actions">
                    <button type="submit" className="edit-button">
                        Save
                    </button>

                    <button
                        type="button"
                        className="delete-button"
                        onClick={() => setIsEditing(false)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        );
    }

    if (isDeleting) {
        return (
            <div className="project-card">
                <h3>Delete project?</h3>

                <p>
                    Are you sure you want to delete "{project.name}"?
                </p>

                <div className="project-card-actions">
                    <button
                        className="cancel-button"
                        onClick={() => setIsDeleting(false)}
                    >
                        Cancel
                    </button>

                    <button
                        className="delete-button"
                        onClick={() => onDelete(project.id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="project-card">
            <div className="project-card-header">
                <h3>{project.name}</h3>

                <span className={`status-badge ${statusClass}`}>
                    {project.status}
                </span>
            </div>

            <div className="project-card-actions">
                <button
                    className="edit-button"
                    onClick={() => setIsEditing(true)}
                >
                    Edit
                </button>

                <button
                    className="delete-button"
                    onClick={() => setIsDeleting(true)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default ProjectCard;