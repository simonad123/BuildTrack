import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import {
  getProjects,
  createProject as createProjectApi,
  deleteProject as deleteProjectApi,
  updateProject as updateProjectApi,
} from "./api";

function App() {

  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getProjects()
      .then((data) => {
        setProjects(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  const createProject = (event) => {
    event.preventDefault();

    createProjectApi(name, status)
      .then((newProject) => {
        setProjects([...projects, newProject]);
        setName("");
        setStatus("");
        setIsCreating(false);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const deleteProject = (projectId) => {
    deleteProjectApi(projectId)
      .then(() => {
        setProjects(
          projects.filter((project) => project.id !== projectId)
        );
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const updateProject = (projectId, name, status) => {
    updateProjectApi(projectId, name, status)
      .then((updatedProject) => {
        setProjects(
          projects.map((project) =>
            project.id === projectId
              ? updatedProject
              : project
          )
        );
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="app">
      <header className="navbar">
        <h1 className="logo">BuildTrack</h1>

        <button
          className="new-project-button"
          onClick={() => setIsCreating(true)}
        >
          + New Project
        </button>
      </header>

      {isCreating && (
        <div className="modal-overlay">
          <form className="modal" onSubmit={createProject}>
            <div className="modal-header">
              <h2>Create New Project</h2>

              <button
                type="button"
                className="close-button"
                onClick={() => setIsCreating(false)}
              >
                ×
              </button>
            </div>

            <label>
              Project name

              <input
                type="text"
                placeholder="Enter project name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>

            <label>
              Status

              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                <option value="">Select status</option>
                <option value="Planning">Planning</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </label>

            <div className="modal-actions">
              <button
                type="button"
                className="cancel-button"
                onClick={() => setIsCreating(false)}
              >
                Cancel
              </button>

              <button type="submit" className="create-button">
                Create Project
              </button>
            </div>
          </form>
        </div>
      )}

      <main className="main-content">
        <h2 className="page-title">Projects</h2>
        <p className="page-subtitle">
          Manage your construction projects
        </p>

        {error ? (
          <p className="error-message">{error}</p>
        ) : isLoading ? (
          <p className="loading-message">Loading projects...</p>
        ) : projects.length === 0 ? (
          <div className="empty-state">
            <h3>No projects yet</h3>
            <p>Create your first construction project to get started.</p>

            <button
              className="new-project-button"
              onClick={() => setIsCreating(true)}
            >
              + New Project
            </button>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onDelete={deleteProject}
                onUpdate={updateProject}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;