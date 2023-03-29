import AuthButton from "./AuthButton";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs/app-beta";

export default function Navbar() {
  return (
    <nav className="flex justify-between rounded-lg px-8 py-2 mx-auto max-w-[700px] shadow-md shadow-slate-700">
      <h1 className="text-2xl font-semibold underline">Expense-Tracker</h1>

      <div>
        <SignedIn>
          <UserButton showName />
        </SignedIn>
        <SignedOut>
          <AuthButton />
        </SignedOut>
      </div>
    </nav>
  );
}
