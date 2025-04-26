import axiosInstance from "../utils/axiosInstance";

export function registerAuth(formdata) {
  return axiosInstance.post("/reg/register", formdata);
}

export function loginAuth(formdata) {
  return axiosInstance.post("/reg/login", formdata);
}
