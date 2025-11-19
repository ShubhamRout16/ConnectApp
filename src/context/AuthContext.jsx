import { useEffect, useState } from "react";
import { account, databases } from "../lib/appwrite.js";
import { AuthContext } from "./AuthContextValue.js";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    account.get()
      .then(res => {
        setUser(res);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // Signup
  const signup = async (email, password, name, username) => {
    try {
      const newAccount = await account.create("unique()", email, password, name);

      // Login immediately
      await account.createEmailPasswordSession(email, password);

      // Create user profile document
      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
        "unique()",
        {
          name,
          username,
          bio: "",
          avatarUrl: "",
          userId: newAccount.$id,
          email,
        }
      );

      const userData = await account.get();
      setUser(userData);
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      await account.createEmailPasswordSession(email, password);
      const loggedUser = await account.get();
      setUser(loggedUser);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
