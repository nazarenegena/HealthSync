import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";
import { error } from "console";

const axiosClient = (): AxiosInstance => {
  // const headers = {
  //   "x-rapidapi-key": "9337f218d9msh41eb1ef54fa33d4p1fd528jsn60ae4d833ade",
  //   "x-rapidapi-host": "exercisedb.p.rapidapi.com",
  // };
  const headers = {
    Accept: "application/json",
    Authorization: "Token d39b2408a3528a12b346e7fc36cb5d5c8dc2a1e5",
    // Authorization: "Bearer Token d39b2408a3528a12b346e7fc36cb5d5c8dc2a1e5",
    Cookie: "sessionid=Token%20d39b2408a3528a12b346e7fc36cb5d5c8dc2a1e5",
  };

  const client = axios.create({
    // baseURL: "https://exercisedb.p.rapidapi.com",
    baseURL: "https://wger.de/api/v2/",
    headers,
    timeout: 60000,
    withCredentials: false,
  });

  client.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      try {
        const { response } = error;
        if (response?.status === 401) {
          localStorage.removeItem("ACCESS_TOKEN");
        }
      } catch (error) {
        console.error(error);
      }
    }
  );

  return client;
};

export default axiosClient;
