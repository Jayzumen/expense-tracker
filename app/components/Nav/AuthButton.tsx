"use client";
import { useClerk } from "@clerk/nextjs/app-beta/client";

const AuthButton = () => {
  const { openSignIn } = useClerk();
  return (
    <div className="flex items-center">
      <button
        aria-label="Open sign in modal"
        className="text-xl hover:underline"
        onClick={() => openSignIn()}
      >
        Sign In
      </button>
    </div>
  );
};

export default AuthButton;
