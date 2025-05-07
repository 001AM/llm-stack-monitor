import { createContext, useContext, useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { api } from "../lib/axios";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkSession = () => {
      try {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
          setStatus("authenticated");
        } else {
          setStatus("unauthenticated");
        }
      } catch (error) {
        console.log("Error checking session:", error);
        setStatus("unauthenticated");
      }
    };
    checkSession();
  }, []);

  const signIn = async (email, password) => {
    try {
      setStatus("loading");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockUser = {
        name: email.split("@")[0],
        email,
        password,
      };
      try {
        const response = await api.post("api/v1/login/", mockUser);
        
        const userToStore = { ...mockUser };
        delete userToStore.password;
        setUser(userToStore);
        localStorage.setItem("user", JSON.stringify(userToStore));
        localStorage.setItem("access-token", response.data.access);
        localStorage.setItem("refresh-token", response.data.refresh);
        setStatus("authenticated");
        navigate("/dashboard");
      } catch (error) {
        console.log("Registration failed 0:", error.response);
        throw error;
      }
    } catch (error) {
      console.log("Login failed:", error);
      setStatus("unauthenticated");
      throw error;
    }
  };

  const signUp = async (email, password) => {
    try {
      setStatus("loading");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockUser = {
        name: email.split("@")[0],
        username: email.split("@")[0],
        email,
        password,
        profileComplete: false,
      };
      try {
        const response = await api.post("api/v1/register/", mockUser);
        console.log(response.data);
        const userToStore = { ...mockUser };
        delete userToStore.password;
        setUser(userToStore);
        localStorage.setItem("user", JSON.stringify(userToStore));
        localStorage.setItem("access-token", response.data.access);
        localStorage.setItem("refresh-token", response.data.refresh);
        setStatus("authenticated");
        navigate("/onboarding");
      } catch (error) {
        console.log("Registration failed 0:", error.response);
        throw error;
      }
    } catch (error) {
      console.log("Registration failed:", error);
      setStatus("unauthenticated");
      throw error;
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("user");
    setStatus("unauthenticated");
    console.log("===")
    navigate("/");
  };

  const resetPassword = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return Promise.resolve();
  };

  if (!mounted) return null;

  return (
    <AuthContext.Provider
      value={{ user, status, signIn, signUp, signOut, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}