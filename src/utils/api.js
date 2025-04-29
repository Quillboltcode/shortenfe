const API_URL = import.meta.env.VITE_API_URL || "";

// Helper to handle response (strict JSON parsing)
const handleResponse = async (response) => {
  if (!response.ok) {
    // Parse the error message from the response body as JSON
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || `Error: ${response.status}`);
  }

  // Always parse the response as JSON
  return response.json();
}

// Add auth header to requests if token exists
const authHeader = () => {
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// API client
export const api = {
  // Health check
  checkHealth: () =>
    fetch(`${API_URL}/health`, {
      method: "GET", // Explicitly specify the GET method
    })
      .then((response) => {
        if (!response.ok) {
          // If the response is not OK, parse the error message as plain text
          return response.text().then((errorText) => {
            throw new Error(errorText || `Error: ${response.status}`);
          });
        }
        // Parse the response as plain text
        return response.text();
      }),

  // URL shortening
  shortenUrl: (data) => 
    fetch(`${API_URL}/shorten`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(handleResponse),

  // Authentication
  login: (credentials) => 
    fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    }).then(handleResponse),

  register: (userData) => 
    fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    }).then(handleResponse),

  logout: () => 
    fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: authHeader(),
    }).then(handleResponse),

  refreshToken: (refreshToken) => 
    fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    }).then(handleResponse),

  // User management
  getCurrentUser: () => 
    fetch(`${API_URL}/users/${localStorage.getItem("userId")}`, {
      headers: authHeader(),
    }).then(handleResponse),

  updateUser: (userId, data) => 
    fetch(`${API_URL}/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...authHeader(),
      },
      body: JSON.stringify(data),
    }).then(handleResponse),

  changePassword: (userId, data) => 
    fetch(`${API_URL}/users/${userId}/password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...authHeader(),
      },
      body: JSON.stringify(data),
    }).then(handleResponse),

  // Admin functions (if user has rights)
  getAllUsers: () => 
    fetch(`${API_URL}/users`, {
      headers: authHeader(),
    }).then(handleResponse),

  deleteUser: (userId) => 
    fetch(`${API_URL}/users/${userId}`, {
      method: "DELETE",
      headers: authHeader(),
    }).then(handleResponse),
};
