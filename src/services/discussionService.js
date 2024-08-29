import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const getOuverteDiscussion = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/discussion/ouverte`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error("Failed to fetch ouverte discussion");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}