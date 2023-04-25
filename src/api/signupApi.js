import axios from "axios";

const BASE_URL = "http://localhost:3001/api";

export const signupApi = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signup`, userData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
