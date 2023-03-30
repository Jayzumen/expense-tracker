import SignInButton from "./SignInButton";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs/app-beta";

const AuthButtons = () => {
  return (
    <div>
      <SignedIn>
        <UserButton showName />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </div>
  );
};

export default AuthButtons;
