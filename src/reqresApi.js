import axios from 'axios';

const instance = (options = {}) => {
  const axiosInstance = axios.create({
    ...options,
    baseURL: 'https://reqres.in/api',
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    responseType: "json",
  });
  return axiosInstance;
};

const reqresApi = instance();

export default reqresApi;
