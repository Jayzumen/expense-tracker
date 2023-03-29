import { currentUser } from "@clerk/nextjs/app-beta";
import type { User } from "@clerk/nextjs/dist/api";
import NotLoggedIn from "./components/Utils/NotLoggedIn";
import Dashboard from "./components/Dashboard";

export default async function HomePage() {
  const user: User | null = await currentUser();

  if (!user) {
    return <NotLoggedIn />;
  }
  return <Dashboard />;
}
