import axios from "axios";

const BASE_URL = "http://localhost:3001/api";

export const signupApi = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signup`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const loginApi = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const logoutApi = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/logout`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
