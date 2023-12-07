import { createContext, useMemo, ReactNode, useCallback } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { IUserDoc } from "@/interfaces/auth.interface";
import { storeKey } from "@/services/utils/keys";

export interface AuthContextType {
  user: IUserDoc | null;
  login: (data: IUserDoc) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useLocalStorage<IUserDoc | null>(storeKey.User, null);


  const login = useCallback(
    (data: IUserDoc) => {
      setUser(data);
    },
    [setUser]
  );

  const logout = useCallback(() => {
    setUser(null);
  }, [setUser]);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [login, logout, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
