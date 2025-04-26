import axiosInstance from "../utils/axiosInstance";

export function taskInput(formdata, accessToken) {
  return axiosInstance.post("/taskApi/task", formdata, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
