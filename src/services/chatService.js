import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const getMessages = async (token, senderId, recipientId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/messages/${senderId}/${recipientId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error("Failed to fetch fetch messages");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}