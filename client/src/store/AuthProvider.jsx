import useLocalStorage from "../hooks/useLocalStorage";
import { AuthContext } from "./store";

export default function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useLocalStorage(
    "taskmangerToken",
    null
  );

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}
