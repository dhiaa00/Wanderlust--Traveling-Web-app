import toast from "react-hot-toast";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Function to handle Google login response

export const handleGoogleResponse = async (response) => {
  console.log("Google login response:", response);
  try {
    const res = await axios.post(
      `${backendUrl}/auth/google`,
      {
        credential: response.credential,
      },
      {
        withCredentials: true,
      }
    );
    console.log("Google login response:", res.data.user);
    // Set user in local storage
    const newData = JSON.stringify(res.data.user);
    console.log("New data:", newData);
    if (newData) {
      window.localStorage.setItem("user", newData);
    }
    toast.success(res?.data?.message);
    setTimeout(() => {
      window.location.href = "/travels";
    }, 1500);
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.error("Error logging in with Google:", error);
  }
};
