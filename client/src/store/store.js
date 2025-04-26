import { useContext, createContext } from "react";


export const AuthContext = createContext({});
export const TasksContext = createContext({});

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  return context;
}

export function useTasks() {
  const context = useContext(TasksContext);

  if (context === undefined) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  return context;
}