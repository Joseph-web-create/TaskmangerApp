import { useContext, createContext } from "react";

export const AuthProvide = createContext({});

export default function useAuth() {
  const useStore = useContext(AuthProvide);

  if (useStore === undefined) {
    throw new Error("Auth must be defined");
  }

  return useStore;
}
