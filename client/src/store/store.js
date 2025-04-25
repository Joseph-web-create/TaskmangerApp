import { useContext, createContext } from "react";


export const AuthContext = createContext({});

export default function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  return context;
}
