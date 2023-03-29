import React, { Dispatch, SetStateAction } from "react";
import Modal from "./Modal";
import { currencyFormatter } from "../../../lib/utils";
import { FaRegTrashAlt } from "react-icons/fa";

const ExpenseEntryModal = ({
  isOpen,
  setIsOpen,
  expense,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  expense: Expense;
}) => {
  const date = new Date(expense.createdAt);

  const deleteExpenseEntry = async (id: string) => {
    try {
      await fetch(`/api/expenses`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex flex-col items-center gap-4">
        <p className="text-3xl capitalize">{expense.name}</p>
        <p>{date.toLocaleString()}</p>
        <p>{currencyFormatter(expense.amount)}</p>
        <button
          onClick={() => {
            deleteExpenseEntry(expense.id);
            setIsOpen(false);
          }}
        >
          <FaRegTrashAlt />
        </button>
      </div>
    </Modal>
  );
};

export default ExpenseEntryModal;
