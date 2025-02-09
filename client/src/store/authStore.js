import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      authUser: null,
      isAuthenticate: false,
      loading: true,

      checkAuth: async () => {
        set({ loading: true }); // Start loading before API call

        try {
          const response = await fetch("http://localhost:4000/api/auth/check-auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Authentication failed");
          }

          console.log("User authenticated:", data);

          set({
            authUser: data,
            isAuthenticate: true,
            loading: false,
          });

        } catch (err) {
          console.error("Auth Error:", err);
          set({
            authUser: null,
            isAuthenticate: false,
            loading: false,
          });

        }
      },

      login: (user) => set({ authUser: user, isAuthenticate: true, loading: false }),

      logout: () => {
        set({ authUser: null, isAuthenticate: false, loading: false });
        localStorage.removeItem("auth-storage"); // Remove persisted storage
      },
    }),
    {
      name: "auth-storage", // ✅ LocalStorage key for persistence
      getStorage: () => localStorage, // ✅ Ensures data is stored in localStorage
    }
  )
);
