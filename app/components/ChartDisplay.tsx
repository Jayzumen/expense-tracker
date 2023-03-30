"use client";

import { useQuery } from "@tanstack/react-query";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartDisplay = () => {
  const { data: expenseData, status } = useQuery<ExpenseData[]>({
    queryKey: ["expenses"],
    queryFn: async () => {
      return await fetch("/api/expenses").then((res) => res.json());
    },
  });

  return (
    <section className="py-6">
      <p className="text-2xl text-center">Stats</p>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : (
        <div className="w-1/2 mx-auto">
          <Doughnut
            data={{
              labels: expenseData?.map((expense) => expense.name),
              datasets: [
                {
                  label: "Expenses",
                  data: expenseData?.map((expense) => expense.amount),
                  backgroundColor: expenseData?.map((expense) => expense.color),
                  borderColor: ["#18181b"],
                  borderWidth: 1,
                },
              ],
            }}
          />
        </div>
      )}
    </section>
  );
};

export default ChartDisplay;
