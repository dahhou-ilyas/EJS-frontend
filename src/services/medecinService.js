// import axios from "axios";

// const API_BASE_URL = "http://localhost:8080"; // Make sure this matches your actual API base URL
// const token = localStorage.getItem('access-token');

// export const getMedecinById = (id) => {
//   try {
//     const response = axios.get(
//       `${API_BASE_URL}/medecins/${id}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }
//     );
//     if (response.status === 200) {
//       return response.data;
//     } else {
//       throw new Error("Failed to fetch medecin data");
//     }
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };


// export const updateMedecin = (id, medecinData) => {
//   try {
//     const response = axios.patch(
//       `${API_BASE_URL}/medecins/${id}`,
//       medecinData,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`
//         },
//       }
//     );
//     if (response.status === 200) {
//       return response.data;
//     } else {
//       throw new Error("Failed to update medecin data");
//     }
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// export const getAllMedecins = (token) => {
//   try {
//     const response = axios.get(`${API_BASE_URL}/medecins`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     if (response.status === 200) {
//       return response.data;
//     } else {
//       throw new Error("Failed to fetch medecin data");
//     }
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }