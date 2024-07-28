const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const API_URL = "https://app.elqadi.me";

export const fetchAPI = async (endpoint, options = {}) => {
  const response = await fetch(`${CORS_PROXY}${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};
