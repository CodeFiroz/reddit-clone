export const checkAuth = async () => {
    try {
        const response = await fetch("http://localhost:4000/api/auth/check-auth", {
            method: "POST",
            credentials: "include",
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error occurred");
        }
        const data = await response.json();
        return data.user;
    } catch (error) {
        console.error("Auth check error:", error.message);
        
    }
};
