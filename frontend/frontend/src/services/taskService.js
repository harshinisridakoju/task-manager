const API_URL = "https://task-manager-mszz.onrender.com/api/tasks";

export const taskService = {
  // Get all tasks
  getAllTasks: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_URL, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!response.ok) throw new Error("Failed to fetch tasks");
      return await response.json();
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  },

  // Create a new task
  createTask: async (taskData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(taskData),
      });
      if (!response.ok) throw new Error("Failed to create task");
      return await response.json();
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  },

  // Update a task
  updateTask: async (id, taskData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(taskData),
      });
      if (!response.ok) throw new Error("Failed to update task");
      return await response.json();
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  },

  // Delete a task
  deleteTask: async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!response.ok) throw new Error("Failed to delete task");
      return await response.json();
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  },
};
