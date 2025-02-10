import { useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate(); // ✅ Use `useNavigate` instead of `<Navigate>`

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/auth/logout", {
          method: "POST",
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          console.error("Error:", data);
          throw new Error(data.message || `Something went wrong ${response.status}`);
        }

        logout(); // ✅ Clear Zustand store
        navigate("/sign-in"); // ✅ Redirect after logout

      } catch (err) {
        console.log("Logout Error:", err);
      }
    };

    handleLogout();
  }, [logout, navigate]); // ✅ Add `navigate` to dependencies

  return <p>Logging out...</p>; // ✅ Show a message while logging out
};

export default Logout;
