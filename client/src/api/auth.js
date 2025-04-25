import axiosInstance from "../utils/axiosInstance";

export default function registerAuth(formdata) {
  return axiosInstance.post("/reg/register", formdata);
}

