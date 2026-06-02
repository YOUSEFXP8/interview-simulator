import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in on mount
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem("currentUser");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    // Simulate minor network delay for premium feel
    await new Promise((resolve) => setTimeout(resolve, 600));

    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const foundUser = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (!foundUser) {
        throw new Error("Invalid email or password.");
      }

      const userSession = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
      };

      localStorage.setItem("currentUser", JSON.stringify(userSession));
      setUser(userSession);
      return userSession;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    // Simulate minor network delay for premium feel
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const emailExists = users.some(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (emailExists) {
        throw new Error("An account with this email already exists.");
      }

      const newUser = {
        id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
        name,
        email,
        password, // In a real backend, this would be hashed
      };

      // Save to list of users
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      // Auto login user
      const userSession = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      };
      localStorage.setItem("currentUser", JSON.stringify(userSession));
      setUser(userSession);
      return userSession;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
