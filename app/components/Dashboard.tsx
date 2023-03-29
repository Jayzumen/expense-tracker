"use client";

import { useState } from "react";
import { expenseList } from "../dummyData";
import { currencyFormatter } from "../../lib/utils";
import ExpenseDisplay from "./ExpenseDisplay";
import ChartDisplay from "./ChartDisplay";
import IncomeModal from "./Modals/IncomeModal";
import ExpenseModal from "./Modals/ExpenseModal";

const Dashboard = ({ userId }: { userId: string }) => {
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [limit, setLimit] = useState(10000);

  const [expenses, setExpenses] = useState<Expense[]>(expenseList);

  return (
    <>
      <IncomeModal
        userId={userId}
        isOpen={showIncomeModal}
        setIsOpen={setShowIncomeModal}
      />
      <ExpenseModal
        userId={userId}
        isOpen={showExpenseModal}
        setIsOpen={setShowExpenseModal}
      />
      <div className="flex flex-col gap-2 min-h-[calc(100vh-80px)] max-w-[700px] mx-auto p-4">
        <h2 className="text-2xl font-semibold text-center">My Expenses</h2>

        {/* my limit */}
        <div className="flex flex-col gap-2 py-4">
          <span className="text-sm ">My Balance</span>
          <span className="text-xl font-semibold">
            {currencyFormatter(limit)}
          </span>
        </div>

        {/* Add value buttons */}
        <div className="flex gap-2 mb-8">
          {/* set limit */}
          <button
            onClick={() => setShowIncomeModal(true)}
            className="px-4 py-2 text-sky-500 rounded-xl bg-slate-700"
          >
            + Income
          </button>
          {/* add expense */}
          <button
            onClick={() => setShowExpenseModal(true)}
            className="px-4 py-2 border text-sky-500 rounded-xl border-slate-700"
          >
            + Expense
          </button>
        </div>

        {/* list of expenses */}
        <ExpenseDisplay expenses={expenses} />

        {/* Chart */}
        <ChartDisplay expenses={expenses} />
      </div>
    </>
  );
};

export default Dashboard;
