import { SignUp } from "@clerk/nextjs/app-beta";

export default function SignUpPage() {
  return (
    <div className="absolute top-0 left-0 w-full h-full min-h-screen bg-black/50">
      <div className="flex flex-col items-center pt-20 mx-auto">
        <SignUp signInUrl="/" />
      </div>
    </div>
  );
}
