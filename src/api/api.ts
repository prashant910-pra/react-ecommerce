//write function to call GET,POST,PUT and delete API using axios
import axios from 'axios';
export const getCall = async (url: string, config = {}) => {
  try {
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export const postCall = async (url: string, data: any, config = {}) => {
  try {
    const response = await axios.post(url, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const putCall = async (url: string, data: any, config = {}) => {
  try {
    const response = await axios.put(url, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const deleteCall = async (url: string, config = {}) => {
  try {
    const response = await axios.delete(url, config);
    return response.data;
  } catch (error) {
    throw error;
  }
}

