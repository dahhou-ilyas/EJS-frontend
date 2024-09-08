import { SPRINGBOOT_API_URL } from "@/config";
import axios from "axios";



export const getOuverteDiscussion = async (token) => {
    try {
        const response = await axios.get(`${SPRINGBOOT_API_URL}/discussion/ouverte`, {
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

export const getDiscussionsByMonth = async (token, month, year) => {
    try {
        const response = await axios.get(`${SPRINGBOOT_API_URL}/discussion/month?year=${year}&month=${month}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error("Failed to fetch discussions by month");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getMyCreatedDiscussions = async (token, page) => {
    try {
        if (!page) page = 0
        const response = await axios.get(`${SPRINGBOOT_API_URL}/discussion?page=${page}&size=5&isParticipant=false`, {
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

export const getPlanifiedDiscussions = async (token, page) => {
    try {
        if (!page) page = 0
        const response = await axios.get(`${SPRINGBOOT_API_URL}/discussion?page=${page}&size=5&isParticipant=true`, {
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

export const getTerminedDiscussions = async (token, page) => {
    try {
        if (!page) page = 0
        const response = await axios.get(`${SPRINGBOOT_API_URL}/discussion?page=${page}&size=5&status=TERMINEE&isParticipant=false`, {
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
        const response = await axios.get(`${SPRINGBOOT_API_URL}/invitation?status=INVITEE`, {
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
        const response = await axios.put(`${SPRINGBOOT_API_URL}/discussion/${id}/start`,{}, {
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
        const response = await axios.put(`${SPRINGBOOT_API_URL}/discussion/${id}/end`,{}, {
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
        const response = await axios.post(`${SPRINGBOOT_API_URL}/discussion`, discussion, {
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
        const response = await axios.post(`${SPRINGBOOT_API_URL}/discussion/${id}/join`, {}, {
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
        const response = await axios.get(`${SPRINGBOOT_API_URL}/discussion/${id}`,{
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

export const acceptInvitation = async (token, id) => {
    try {
        const response = await axios.put(`${SPRINGBOOT_API_URL}/invitation/${id}/accept`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
          })
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error("Failed to accept the invitation");
        }
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

export const declineInvitation = async (token, id) => {
    try {
        const response = await axios.put(`${SPRINGBOOT_API_URL}/invitation/${id}/decline`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
          })
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error("Failed to decline the invitation");
        }
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

export const createCompteRendu = async (token, compterendu) => {
    try {
        const response = await axios.post(`${SPRINGBOOT_API_URL}/compterendu`, compterendu, {
            headers: {
                Authorization: `Bearer ${token}`
            }
          })
        if (response.status === 201) {
          return response.data;
        } else {
          throw new Error("Failed to create the report");
        }
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}