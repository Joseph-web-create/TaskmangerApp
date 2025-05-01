import { useCallback, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { AuthContext } from "./store";
import handleError from "../utils/handleError";
import { authenticateUser, logOut } from "../api/auth";
import { toast } from "sonner";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useLocalStorage(
    "taskmangerToken",
    null
  );

  const handleLogout = useCallback(async () => {
    try {
      const res = await logOut();
      if (res?.status === 200) {
        toast.success(res.data.message, { id: "logout" });
        setAccessToken(null);
        setUser(null);

        window.location.reload();
      }
    } catch (error) {
      toast.error("There was an error trying to log you out");
      console.error(error);
    }
  }, [setAccessToken]);

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
        handleLogout();
      }
    };
    fetchUser();
  }, [accessToken, handleLogout]);

  console.log("user", user);

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, user, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
