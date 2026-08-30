const API_URL = "http://localhost:8000";

export const getProjects = () => {
  return fetch(`${API_URL}/projects`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      return response.json();
    });
};

export const createProject = (name, status) => {
  return fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      status: status,
    }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to create project");
    }

    return response.json();
  });
};

export const deleteProject = (projectId) => {
  return fetch(`${API_URL}/projects/${projectId}`, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to delete project");
    }

    return response.json();
  });
};

export const updateProject = (projectId, name, status) => {
  return fetch(`${API_URL}/projects/${projectId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      status: status,
    }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to update project");
    }

    return response.json();
  });
};