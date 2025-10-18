import { signInWithPopup } from "firebase/auth";
import { axiosInstance } from "./axios";
import { auth, googleProvider } from "./firebase";



export const signupAPI = async (name: string, email: string, password: string) => {
    try {
          const res = await axiosInstance.post("/auth/signup", { name, email, password });
  return res.data; 
    } catch (error) {
        console.error("Signup API Error:", error);
        throw error;
    }

};
export const loginAPI = async (email: string, password: string) => {
    try {
          const res = await axiosInstance.post("/auth/login", { email, password });
  return res.data;
    } catch (error) {
        console.error("Login API Error:", error);
        throw error;
    }

};

export const googleLoginAPI = async () => {
    try {
          const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  const res = await axiosInstance.post("/auth/google-login", {
    name: user.displayName,
    email: user.email,
  });
    return res.data; 
    } catch (error) {
        console.error("Google Login API Error:", error);
        throw error;
    }



};

export const forgotPasswordAPI = async (email: string) => {
    try {
        const res = await axiosInstance.post("/auth/forgot-password", { email });
  return res.data;
    } catch (error) {
        console.error("Forgot Password API Error:", error);
        throw error;
    }
  
};
export const resetPasswordAPI = async (token: string, newPassword: string) => {
    try {
         const res = await axiosInstance.post("/auth/reset-password", { token, newPassword });
  return res.data;
    } catch (error) {
        console.error("Reset Password API Error:", error);
        throw error;
    }   
};