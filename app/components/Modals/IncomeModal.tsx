"use client";

import React, { Dispatch, SetStateAction, useRef } from "react";
import Modal from "./Modal";
import { FaRegTrashAlt } from "react-icons/fa";
import { currencyFormatter } from "../../../lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Expense, Income } from "@/types/finances";
import { LoadingSpinner } from "@/app/util/loading";

const IncomeModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const amountRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const { data: incomeData, status } = useQuery<Income[]>(
    ["income"],
    async () => {
      const data = await fetch("/api/income");
      return await data.json();
    }
  );

  const deleteIncomeEntry = async (id: string) => {
    try {
      await fetch(`/api/income`, {
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
    mutationFn: deleteIncomeEntry,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries(["income"]);
      const previousIncome = queryClient.getQueryData<Expense[]>(["income"]);
      queryClient.setQueryData<Expense[]>(
        ["income"],
        previousIncome?.filter((e) => e.id !== id)
      );
      toast.success("Income deleted successfully");
      return { previousIncome };
    },
  });

  const addIncome = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await fetch("/api/income", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: descriptionRef.current!.value,
          amount: Number(amountRef.current!.value),
        }),
      });
    } catch (error) {
      console.log(error);
    }

    amountRef.current!.value = "";
    descriptionRef.current!.value = "";
  };

  const addHandler = useMutation({
    mutationFn: addIncome,
    onSuccess: () => {
      queryClient.invalidateQueries(["income"]);
      toast.success("Income added successfully");
    },
  });

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={addHandler.mutate} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <label className="sr-only" htmlFor="income">
            Income
          </label>
          <input
            className="px-4 py-2 rounded-xl bg-slate-700"
            type="number"
            id="income"
            ref={amountRef}
            min={0.01}
            step={0.01}
            placeholder="Enter income amount"
            required
          />
        </div>
        <div className="flex flex-col gap-4">
          <label className="sr-only" htmlFor="description">
            Income Description
          </label>
          <input
            className="px-4 py-2 rounded-xl bg-slate-700"
            type="text"
            id="description"
            ref={descriptionRef}
            min={0.01}
            step={0.01}
            placeholder="Enter income description"
            required
          />
        </div>
        <button
          aria-label="Add income"
          className="px-4 py-2 mx-auto rounded-lg hover:bg-sky-600 bg-sky-700"
        >
          Add Income
        </button>
      </form>

      <div className="flex flex-col gap-4 mt-6">
        <p className="text-2xl font-bold">Income History</p>

        {status === "loading" ? (
          <LoadingSpinner size={24} />
        ) : (
          incomeData
            ?.sort((a, b) => Number(a.created_at) - Number(b.created_at))
            .map((i) => {
              const date = new Date(i.created_at);
              return (
                <div className="flex justify-between item-center" key={i.id}>
                  <div>
                    <p className="font-semibold">{i.description}</p>
                    <small className="text-xs">{date.toLocaleString()}</small>
                  </div>
                  <p className="flex items-center gap-2">
                    {currencyFormatter(i.amount)}
                    <button
                      aria-label="Delete Income"
                      onClick={() => {
                        deleteHandler.mutate(i.id);
                      }}
                    >
                      <FaRegTrashAlt />
                    </button>
                  </p>
                </div>
              );
            })
        )}
      </div>
    </Modal>
  );
};

export default IncomeModal;
