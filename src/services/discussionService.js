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

export const getMyCreatedDiscussions = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/discussion?page=0&size=5&isParticipant=false`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error("Failed to fetch Created discussions");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getPlanifiedDiscussions = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/discussion?page=0&size=5&isParticipant=true`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error("Failed to fetch Planified discussions");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getTerminedDiscussions = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/discussion?page=0&size=5&status=TERMINEE&isParticipant=false`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error("Failed to fetch Termined discussions");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getInvitations = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/invitation?status=INVITEE`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error("Failed to fetch invitations");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const startDiscussion = async (token, id) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/discussion/${id}/start`,{}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error("Failed to start the discussion");
        }
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

export const endDiscussion = async (token, id) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/discussion/${id}/end`,{}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error("Failed to end the discussion");
        }
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

export const createDiscussion = async (token, discussion) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/discussion`, discussion, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error("Failed to create the discussion");
        }
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

export const joinOuverteDiscussion = async (token, id) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/discussion/${id}/join`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error("Failed to join the discussion");
        }
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

export const getDiscussion = async (token, id) => {
    try {
        const response = await axios.get(`http://localhost:8080/discussion/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
          })
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error("Failed to join the discussion");
        }
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}