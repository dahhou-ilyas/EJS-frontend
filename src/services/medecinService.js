import axios from "axios";

const API_BASE_URL = "http://localhost:8080"; // Make sure this matches your actual API base URL

export const getMedecinById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/medecins/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch medecin data");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateMedecin = async (id, medecinData) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/medecins/${id}`,
      medecinData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to update medecin data");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
