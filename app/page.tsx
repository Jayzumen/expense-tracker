import { currentUser } from "@clerk/nextjs/app-beta";
import type { User } from "@clerk/nextjs/dist/api";
import NotLoggedIn from "./components/Utils/NotLoggedIn";
import Dashboard from "./components/Dashboard";
import getQueryClient from "./util/getQueryClient";
import { Hydrate, dehydrate } from "@tanstack/react-query";
import { db } from "@/lib/dbConn";
import { expense, income } from "@/lib/schema";
import { eq } from "drizzle-orm/expressions";
import { Expense, Income } from "@/types/finances";

const getExpenses = async () => {
  const user: User | null = await currentUser();

  const data = await db
    .select()
    .from(expense)
    .where(eq(expense.user_id, user?.id as string))
    .execute();
  return data;
};

const getIncome = async () => {
  const user: User | null = await currentUser();

  const data = await db
    .select()
    .from(income)
    .where(eq(income.user_id, user?.id as string))
    .execute();
  return data;
};

const getLimit = async () => {
  const incomeData = await getIncome();

  const incomeAmount: number = incomeData.reduce(
    (acc: number, curr: Income) => {
      return acc + curr.amount;
    },
    0
  );

  const expenseData = await getExpenses();

  const expenseAmount: number = expenseData.reduce(
    (acc: number, curr: Expense) => {
      return acc + curr.amount;
    },
    0
  );

  const balance = incomeAmount - expenseAmount;

  return balance;
};

export default async function HomePage() {
  const user: User | null = await currentUser();
  if (!user) {
    return <NotLoggedIn />;
  }

  // const queryClient = getQueryClient();
  // await queryClient.prefetchQuery(["expenses"], getExpenses);
  // await queryClient.prefetchQuery(["income"], getIncome);
  // await queryClient.prefetchQuery(["limit"], getLimit);
  // const dehydratedState = dehydrate(queryClient);

  return (
    // <Hydrate state={dehydratedState}>
    <Dashboard />
    // </Hydrate>
  );
}
