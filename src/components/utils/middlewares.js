import axios from "axios";

axios.interceptors.request.use(function (config) {
    console.log("Config ",config);
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

axios.interceptors.response.use(function (response) {
    console.log("Response", response);
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

export default axios;



































// export const errorInterceptor = axios.interceptors.response.use(
//     response => response,
//     error => {
//       const status = error.response ? error.response.status : null;
      
//       if (status === 401) {
//         console.log("Unauthorized access");
//       } else if (status === 404) {
//         console.log("Post not found");
//       } else {
//         console.error("An error occurred:", error);
//       }
//       return Promise.reject(error);
//     }
//   );

//   export const authInterceptor = axios.interceptors.request.use(config => {
//     const authToken = localStorage.getItem('authToken');
//     if (authToken) {
//       config.headers.Authorization = `Bearer ${authToken}`;
//     }
//     return config;
//   });
  