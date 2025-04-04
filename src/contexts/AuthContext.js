import { createContext, useEffect, useState } from "react";
import { Token, User } from "@/api";

const tokenCtrl = new Token();
const userCtrl = new User();

export const AuthContext = createContext();

export function AuthProvider(props) {
  const { children } = props;
  const [user, setUser] = useState(null);
  const [accesToken, setAccesToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const token = tokenCtrl.getToken(); 

      if (!token) {
        logout();
        setLoading(false);
        return;
      }

      if (tokenCtrl.hasExpired(token)) {
        logout();
      } else {
        await login(token);
      }
    })(); 
  }, []);

  const login = async (token) => {
    try {
      tokenCtrl.setToken(token);
      setAccesToken(token);
      const response = await userCtrl.getMeAPi();
      setUser(response);      
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const logout = () => {
    tokenCtrl.removeToken();
    setAccesToken(null);
    setUser(null);
  };

  const data = {
    accesToken,
    user,
    login,
    logout,
  };

  if (loading) return null;

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
