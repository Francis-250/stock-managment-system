import { createContext, useEffect, useState } from "react";
import api from "../lib/axios.js";

export const userContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await api.get("/user/me");

        setUser(res.data.user);
      } catch (err) {
        console.log("Not logged in", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  const authenticated = !!user;
  const role = user?.role || null;

  return (
    <userContext.Provider
      value={{ user, setUser, loading, authenticated, role }}
    >
      {children}
    </userContext.Provider>
  );
}
