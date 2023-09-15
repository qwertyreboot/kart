import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

const initialState = {
  user: null,
  token: null,
};

const useLocalAuth = (initialState) => {
  const [auth, setAuth] = useState(initialState);

  const setLoaclAuth = (auth) => {
    localStorage.setItem("auth", JSON.stringify(auth));
    setAuth(auth);
  };

  return [auth, setLoaclAuth];
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useLocalAuth(initialState);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));

    if (auth) {
      setAuth(auth);
    }
  }, []);

  const signin = async (username, password) => {
    const response = await axios.post("api/auth/signin", {
      username,
      password,
    });

    if (response.status === 200 && response.data) {
      const { user, token } = response.data;
      setAuth({ user, token });

      return true;
    }

    return false;
  };

  const signup = async (name, email, phone, password) => {
    const response = await axios.post("api/auth/signup", {
      name,
      email,
      phone,
      password,
    });

    if (response.status === 201 && response.data) {
      const { user, token } = response.data;
      setAuth({ user, token });

      return true;
    }

    return false;
  };

  const signout = () => {
    setAuth(initialState);
  };

  return (
    <AuthContext.Provider value={{ ...auth, signin, signup, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
