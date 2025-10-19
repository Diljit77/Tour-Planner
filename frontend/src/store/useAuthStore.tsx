import { create } from "zustand";

interface AuthState {
  user: any | null;
  token: string | null;
  setUser: (user: any, token: string) => void;
  logout: () => void;
  loadFromStorage: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  setUser: (user, token) => {
    localStorage.setItem("authUser", JSON.stringify(user));
    localStorage.setItem("authToken", token);
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");
    set({ user: null, token: null });
  },
  loadFromStorage: () => {
    const storedUser = localStorage.getItem("authUser");
    const storedToken = localStorage.getItem("authToken");
    if (storedUser && storedToken) {
      set({ user: JSON.parse(storedUser), token: storedToken });
    }
  },
}));