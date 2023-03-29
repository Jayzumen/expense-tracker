"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartDisplay = ({ expenses }: { expenses: Expense[] }) => {
  return (
    <section className="py-6">
      <h3 className="text-2xl text-center">Stats</h3>
      <div className="w-1/2 mx-auto">
        <Doughnut
          data={{
            labels: expenses.map((expense) => expense.name),
            datasets: [
              {
                label: "Expenses",
                data: expenses.map((expense) => expense.amount),
                backgroundColor: expenses.map((expense) => expense.color),
                borderColor: ["#18181b"],
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>
    </section>
  );
};

export default ChartDisplay;
