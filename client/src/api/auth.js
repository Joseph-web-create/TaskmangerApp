import axiosInstance from "../utils/axiosInstance";

export function registerAuth(formdata) {
  return axiosInstance.post("/auth/register", formdata);
}

export function loginAuth(formdata) {
  return axiosInstance.post("/auth/login", formdata);
}

export function authenticateUser(token) {
  return axiosInstance.get("/auth/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}