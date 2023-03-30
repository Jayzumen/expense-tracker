import { currentUser } from "@clerk/nextjs/app-beta";
import type { User } from "@clerk/nextjs/dist/api";
import NotLoggedIn from "./components/Utils/NotLoggedIn";
import Dashboard from "./components/Dashboard";
import prismadb from "../lib/prismadb";
import { Expense, Income } from "@prisma/client";
import getQueryClient from "./util/getQueryClient";
import { Hydrate, dehydrate } from "@tanstack/react-query";

const getExpenses = async () => {
  const user: User | null = await currentUser();

  const data = await prismadb.expense.findMany({
    where: {
      user_Id: user?.id,
    },
  });
  return data;
};

const getIncome = async () => {
  const user: User | null = await currentUser();

  const data = await prismadb.income.findMany({
    where: {
      user_Id: user?.id,
    },
  });
  return data;
};

const getLimit = async () => {
  const user: User | null = await currentUser();

  const incomeData = await prismadb.income.findMany({
    where: {
      user_Id: user?.id,
    },
  });
  const income: number = incomeData.reduce((acc: number, curr: Income) => {
    return acc + curr.amount;
  }, 0);

  const expenseData = await prismadb.expense.findMany({
    where: {
      user_Id: user?.id,
    },
  });

  const expense: number = expenseData.reduce((acc: number, curr: Expense) => {
    return acc + curr.amount;
  }, 0);

  const balance = income - expense;

  return balance;
};

export default async function HomePage() {
  const user: User | null = await currentUser();
  if (!user) {
    return <NotLoggedIn />;
  }

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["expenses"], getExpenses);
  await queryClient.prefetchQuery(["income"], getIncome);
  await queryClient.prefetchQuery(["limit"], getLimit);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Dashboard />
    </Hydrate>
  );
}
