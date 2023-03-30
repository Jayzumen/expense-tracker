"use client";
import { useState } from "react";
import { currencyFormatter } from "../../lib/utils";
import ExpenseEntryModal from "./Modals/ExpenseEntryModal";
import { useQuery } from "@tanstack/react-query";

const ExpenseDisplay = () => {
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [id, setId] = useState("");

  const { data: expenseData, status } = useQuery<ExpenseData[]>({
    queryKey: ["expenses"],
    queryFn: async () => {
      return await fetch("/api/expenses").then((res) => res.json());
    },
  });

  const openModal = (id: string) => {
    setShowExpenseModal(true);
    setId(id);
  };
  return (
    <>
      {/* <ExpenseEntryModal
        isOpen={showExpenseModal}
        setIsOpen={setShowExpenseModal}
        id={id}
      /> */}

      {status === "loading" ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col gap-4">
          {expenseData?.map((e) => {
            const date = new Date(e.createdAt);
            return (
              <div
                key={e.id}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-700"
              >
                <div className="flex items-center gap-2">
                  <button
                    aria-label="Open modal to edit expense"
                    onClick={() => openModal(e.id)}
                    className="w-6 h-6 rounded-full"
                    style={{
                      backgroundColor: e.color,
                    }}
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold captitalize">{e.name}</span>
                    <span className="text-sm text-sky-400">
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
      )}
    </>
  );
};

export default ExpenseDisplay;
