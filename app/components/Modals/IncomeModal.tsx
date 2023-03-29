import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import Modal from "./Modal";
import { FaRegTrashAlt } from "react-icons/fa";
import { currencyFormatter } from "../../../lib/utils";

interface Income {
  id: number;
  amount: number;
  description: string;
  createdAt: Date;
}

const IncomeModal = ({
  userId,
  isOpen,
  setIsOpen,
}: {
  userId: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [income, setIncome] = useState<Income[]>([]);
  const amountRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const addIncome = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newIncome: Income = {
      id: income.length + 1,
      amount: Number(amountRef.current?.value),
      description: descriptionRef.current?.value as string,
      createdAt: new Date(),
    };

    setIncome([...income, newIncome]);

    amountRef.current!.value = "";
    descriptionRef.current!.value = "";
  };
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={addIncome} className="flex flex-col gap-4">
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
        <button className="px-4 py-2 mx-auto rounded-lg hover:bg-sky-600 bg-sky-700">
          Add Income
        </button>
      </form>

      <div className="flex flex-col gap-4 mt-6">
        <h3 className="text-2xl font-bold">Income History</h3>

        {income.map((i) => {
          return (
            <div className="flex justify-between item-center" key={i.id}>
              <div>
                <p className="font-semibold">{i.description}</p>
                <small className="text-xs">
                  {i.createdAt.toLocaleString()}
                </small>
              </div>
              <p className="flex items-center gap-2">
                {currencyFormatter(i.amount)}
                <button
                //   onClick={() => {
                //     deleteIncomeEntryHandler(i.id);
                //   }}
                >
                  <FaRegTrashAlt />
                </button>
              </p>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default IncomeModal;
