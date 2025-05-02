import axios from "axios";

axios.interceptors.request.use(function (config) {
  console.log("Config ", config);
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  console.log("Response", response.data.data);
  return response;
}, function (error) {
  if (error.response.status === 401) {
    console.error("Unauthorized User")
  }
  else if (error.response.status === 404) {
    console.error("Not Found...")
  }
  else if (error.response.status === 400) {
    console.error("Bad Request")
  }
  else if (error.response.status === 408) {
    console.error("Request Timeout")
  }
  else if (error.response.status === 413) {
    console.error("Content Too Large")
  }
  else {
    console.error("Unexpacted Error Occured")
  }
  return Promise.reject(error);
});

export default axios;


export const errorInterceptor = axios.interceptors.response.use(
  response => response,
  error => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      console.log("Unauthorized access");
    } else if (status === 404) {
      console.log("Not found");
    } else {
      console.error("An error occurred:", error);
    }
    return Promise.reject(error);
  }
);

export const authInterceptor = axios.interceptors.request.use(config => {
  const authToken = localStorage.getItem('authToken');
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});