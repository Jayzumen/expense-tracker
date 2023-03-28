"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs/app-beta/client";
import { useClerk } from "@clerk/nextjs/app-beta/client";

const AuthButton = () => {
  const { openSignIn } = useClerk();
  return (
    <div className="flex items-center">
      <SignedIn>
        <UserButton showName />
      </SignedIn>
      <SignedOut>
        <button
          className="text-xl hover:underline"
          onClick={() => openSignIn()}
        >
          Sign In
        </button>
      </SignedOut>
    </div>
  );
};

export default AuthButton;
