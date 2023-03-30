"use client";

import { useState } from "react";
import ExpenseDisplay from ".././components/ExpenseDisplay";
import ChartDisplay from ".././components/ChartDisplay";
import { currencyFormatter } from "../../lib/utils";
import ExpenseModal from ".././components/Modals/ExpenseModal";
import IncomeModal from ".././components/Modals/IncomeModal";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  const { data: limitData, status } = useQuery<number>({
    queryKey: ["limit"],
    queryFn: async () => {
      return await fetch("/api/limit").then((res) => res.json());
    },
    refetchInterval: 1000,
  });

  return (
    <>
      <IncomeModal isOpen={showIncomeModal} setIsOpen={setShowIncomeModal} />
      <ExpenseModal isOpen={showExpenseModal} setIsOpen={setShowExpenseModal} />
      <div className="flex flex-col gap-2 min-h-[calc(100vh-80px)] max-w-[700px] mx-auto p-4">
        <h2 className="text-2xl font-semibold text-center">My Expenses</h2>

        {/* my limit */}
        <div className="flex flex-col gap-2 py-4">
          <span className="text-sm ">My Balance</span>
          {status === "loading" ? (
            <p>Loading...</p>
          ) : (
            <span className="text-xl font-semibold">
              {currencyFormatter(limitData || 0)}
            </span>
          )}
        </div>

        {/* Add value buttons */}
        <div className="flex gap-4 mb-8">
          {/* add income */}
          <button
            aria-label="Open modal to add income"
            onClick={() => setShowIncomeModal(true)}
            className="px-4 py-2 font-semibold transition hover:scale-105 text-lime-500 rounded-xl bg-slate-700"
          >
            + Income
          </button>
          {/* add expense */}
          <button
            aria-label="Open modal to add expense"
            onClick={() => setShowExpenseModal(true)}
            className="px-4 py-2 font-semibold transition border hover:scale-105 text-sky-500 rounded-xl border-slate-700"
          >
            + Expense
          </button>
        </div>

        {/* list of expenses */}
        <ExpenseDisplay />

        {/* Chart */}
        <ChartDisplay />
      </div>
    </>
  );
};

export default Dashboard;
