import useLocalStorage from "../hooks/useLocalStorage";
import { AuthProvide } from "./store";

export default function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useLocalStorage(
    "taskmangerToken",
    null
  );

  return (
    <AuthProvide.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthProvide.Provider>
  );
}
