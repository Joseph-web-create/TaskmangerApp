import { useEffect, useState } from "react";
import { TasksContext, useAuth } from "./store";
import { getAllTasks } from "../api/task";
import handleError from "../utils/handleError";

export default function TasksProvider({ children }) {
  const { accessToken } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
       if (!accessToken) return;
      try {
        const res = await getAllTasks(accessToken);

        if (res.status === 200) {
          setData(res.data.task);
        }
      } catch (error) {
        handleError(error);
      }
    };
    fetchPost();
  }, [accessToken]);
  console.log("Task Data", data);

  return (
    <TasksContext.Provider value={{ data, setData }}>
      {children}
    </TasksContext.Provider>
  );
}
