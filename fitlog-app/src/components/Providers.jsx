"use client";

import { ToastContainer } from "react-toastify";
import { WorkoutProvider } from "@/context/WorkoutContext";

export default function Providers({ children }) {
  return (
    <WorkoutProvider>
      {children}

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
      />
    </WorkoutProvider>
  );
}