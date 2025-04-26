import { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { AuthContext } from "./store";
import handleError from "../utils/handleError";
import { authenticateUser } from "../api/auth";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useLocalStorage(
    "taskmangerToken",
    null
  );

  

  useEffect(() => {
    if (!accessToken) return;

    const fetchUser = async () => {
      try {
        const res = await authenticateUser(accessToken);
        if (res.status === 200) {
          setUser(res.data.user);
        }
      } catch (error) {
        handleError(error);
      }
    };
    fetchUser();
  }, [accessToken]);
  console.log("user", user);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, user }}>
      {children}
    </AuthContext.Provider>
  );
}
