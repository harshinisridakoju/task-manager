const AUTH_URL = "https://task-manager-mszz.onrender.com/api/auth";

export const authService = {
  register: async (data) => {
    const res = await fetch(`${AUTH_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error((await res.json()).message || "Registration failed");
    return await res.json();
  },

  login: async (data) => {
    const res = await fetch(`${AUTH_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error((await res.json()).message || "Login failed");
    return await res.json();
  },
};
