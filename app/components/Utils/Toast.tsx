"use client";

import { Toaster } from "react-hot-toast";

const Toast = () => {
  return (
    <Toaster
      position="bottom-center"
      reverseOrder={false}
      toastOptions={{
        className: "bg-slate-800 text-white",
      }}
    />
  );
};

export default Toast;
