"use client";

import { Dispatch, SetStateAction, useRef, useState } from "react";
import Modal from "./Modal";

const ExpenseModal = ({
  userId,
  isOpen,
  setIsOpen,
}: {
  userId: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let newColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

    while (expenses.some((expense) => expense.color === newColor)) {
      newColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    }

    nameRef.current!.value = "";
    amountRef.current!.value = "";
  };
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={addExpense} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <label className="sr-only" htmlFor="name">
            Expense Name
          </label>
          <input
            className="px-4 py-2 rounded-xl bg-slate-700"
            type="text"
            id="name"
            ref={nameRef}
            min={0.01}
            step={0.01}
            placeholder="Enter expense name"
            required
          />
        </div>
        <div className="flex flex-col gap-4">
          <label className="sr-only" htmlFor="expense">
            Expense Amount
          </label>
          <input
            className="px-4 py-2 rounded-xl bg-slate-700"
            type="number"
            id="expense"
            ref={amountRef}
            min={0.01}
            step={0.01}
            placeholder="Enter expense amount"
            required
          />
        </div>

        <button className="px-4 py-2 mx-auto rounded-lg hover:bg-sky-600 bg-sky-700">
          Add Expense
        </button>
      </form>
    </Modal>
  );
};

export default ExpenseModal;
