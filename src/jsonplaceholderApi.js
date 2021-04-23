import axios from 'axios';

const instance = (options = {}) => {
  const axiosInstance = axios.create({
    ...options,
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    responseType: "json",
  });
  return axiosInstance;
};

const jsonplaceholderApi = instance();

export default jsonplaceholderApi;
