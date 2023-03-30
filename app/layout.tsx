import "./globals.css";
import Navbar from "./components/Nav/Navbar";
import { ClerkProvider } from "@clerk/nextjs/app-beta";
import { dark } from "@clerk/themes";
import Toast from "./components/Utils/Toast";
import Providers from "./util/Provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const metadata = {
  title: "Expense-Tracker",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          baseTheme: dark,
        }}
      >
        <body className="relative text-white bg-slate-900">
          <Providers>
            <Navbar />
            {children}
            <ReactQueryDevtools />
          </Providers>
          <Toast />
        </body>
      </ClerkProvider>
    </html>
  );
}
