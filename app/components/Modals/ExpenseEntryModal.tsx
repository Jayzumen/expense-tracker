"use client";

import React, { Dispatch, SetStateAction } from "react";
import Modal from "./Modal";
import { currencyFormatter } from "../../../lib/utils";
import { FaRegTrashAlt } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Expense } from "@/types/finances";
import { LoadingSpinner } from "@/app/util/loading";

const ExpenseEntryModal = ({
  isOpen,
  setIsOpen,
  id,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
}) => {
  const queryClient = useQueryClient();

  const { data: expense, status } = useQuery<Expense>({
    queryKey: ["expense", id],
    queryFn: async () => {
      return await fetch(`/api/expenses/${id}`).then((res) => res.json());
    },
  });

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

  const deleteHandler = useMutation({
    mutationFn: deleteExpenseEntry,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries(["expenses"]);
      const previousExpenses = queryClient.getQueryData<Expense[]>([
        "expenses",
      ]);
      queryClient.setQueryData<Expense[]>(
        ["expenses"],
        previousExpenses?.filter((e) => e.id !== id)
      );
      toast.success("Expense deleted successfully");
      return { previousExpenses };
    },
  });

  const date = new Date(expense?.created_at!);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex flex-col items-center gap-4">
        {status === "loading" ? (
          <div className="flex items-center">
            <LoadingSpinner size={48} />
          </div>
        ) : status === "error" ? (
          <p>Something went wrong</p>
        ) : (
          <>
            <p className="text-3xl capitalize">{expense.name}</p>
            <p>{date.toLocaleString()}</p>
            <p>{currencyFormatter(expense.amount)}</p>
            <button
              aria-label="Delete expense entry"
              onClick={() => {
                deleteHandler.mutate(expense.id);
                setIsOpen(false);
              }}
            >
              <FaRegTrashAlt />
            </button>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ExpenseEntryModal;
