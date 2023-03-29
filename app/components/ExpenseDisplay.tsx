"use client";
import { useState } from "react";
import { currencyFormatter } from "../../lib/utils";
import ExpenseEntryModal from "./Modals/ExpenseEntryModal";

const ExpenseDisplay = ({ expenses }: { expenses: Expense[] }) => {
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [expense, setExpense] = useState<Expense>({} as Expense);
  const openModal = (expense: Expense) => {
    setShowExpenseModal(true);
    setExpense(expense);
  };
  return (
    <>
      <ExpenseEntryModal
        isOpen={showExpenseModal}
        setIsOpen={setShowExpenseModal}
        expense={expense}
      />
      <div className="flex flex-col gap-4">
        {expenses.map((e) => {
          const date = new Date(e.createdAt);
          return (
            <div
              key={e.id}
              className="flex items-center justify-between p-3 rounded-lg bg-slate-700"
            >
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openModal(e)}
                  className="w-6 h-6 rounded-full"
                  style={{
                    backgroundColor: e.color,
                  }}
                />
                <div className="flex flex-col">
                  <span className="font-semibold captitalize">{e.name}</span>
                  <span className="text-sm text-gray-400">
                    {date.toLocaleString()}
                  </span>
                </div>
              </div>
              <span className="font-semibold">
                {currencyFormatter(e.amount)}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ExpenseDisplay;
