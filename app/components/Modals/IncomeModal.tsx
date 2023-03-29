import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Modal from "./Modal";
import { FaRegTrashAlt } from "react-icons/fa";
import { currencyFormatter } from "../../../lib/utils";

const IncomeModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [income, setIncome] = useState<Income[]>([]);
  const amountRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const getIncome = async () => {
    try {
      const data = await fetch("/api/income", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const incomeData: Income[] = await data.json();
      setIncome(incomeData);
    } catch (error) {
      console.log(error);
    }
  };

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
      getIncome();
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    getIncome();
  }, []);
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
          const date = new Date(i.createdAt);
          return (
            <div className="flex justify-between item-center" key={i.id}>
              <div>
                <p className="font-semibold">{i.description}</p>
                <small className="text-xs">{date.toLocaleString()}</small>
              </div>
              <p className="flex items-center gap-2">
                {currencyFormatter(i.amount)}
                <button
                  onClick={() => {
                    deleteIncomeEntry(i.id);
                  }}
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
