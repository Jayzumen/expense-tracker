import { currentUser } from "@clerk/nextjs/app-beta";
import type { User } from "@clerk/nextjs/dist/api";
import NotLoggedIn from "./components/Utils/NotLoggedIn";
import Dashboard from "./components/Dashboard";
import prismadb from "../lib/prismadb";
import { Income } from "@prisma/client";
import getQueryClient from "./util/getQueryClient";
import { dehydrate } from "@tanstack/query-core";
import { Hydrate } from "./util/HydrateClient";

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

  const data = await prismadb.income.findMany({
    where: {
      user_Id: user?.id,
    },
  });
  const limit: number = data.reduce((acc: number, curr: Income) => {
    return acc + curr.amount;
  }, 0);
  return limit;
};

export default async function HomePage() {
  const user: User | null = await currentUser();

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["expenses"], getExpenses);
  await queryClient.prefetchQuery(["income"], getIncome);
  await queryClient.prefetchQuery(["limit"], getLimit);
  const dehydratedState = dehydrate(queryClient);

  if (!user) {
    return <NotLoggedIn />;
  }
  return (
    <Hydrate state={dehydratedState}>
      <Dashboard />
    </Hydrate>
  );
}
