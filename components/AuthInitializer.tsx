"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { setUser, logoutUser } from "@/features/authSlice"; // your slice actions
import axios from "axios";

export default function AuthInitializer() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("accessToken"); // stored after login

      if (!token) {
        dispatch(logoutUser());
        return;
      }

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/me/`, // endpoint to get current user
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        dispatch(setUser(res.data)); // store user data in Redux
      } catch (err) {
        console.error("Auth check failed:", err);
        localStorage.removeItem("accessToken");
        dispatch(logoutUser());
      }
    };

    initAuth();
  }, [dispatch]);

  return null; // renders nothing
}
