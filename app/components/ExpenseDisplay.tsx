"use client";
import { currencyFormatter } from "../../lib/utils";

const ExpenseDisplay = ({ expenses }: { expenses: Expense[] }) => {
  return (
    <div className="flex flex-col gap-4">
      {expenses.map((e) => (
        <div
          key={e.id}
          className="flex items-center justify-between p-3 rounded-lg bg-slate-700"
        >
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full"
              style={{
                backgroundColor: e.color,
              }}
            />
            <div className="flex flex-col">
              <span className="font-semibold captitalize">{e.name}</span>
              <span className="text-sm text-gray-500">{e.date}</span>
            </div>
          </div>
          <span className="font-semibold">{currencyFormatter(e.amount)}</span>
        </div>
      ))}
    </div>
  );
};

export default ExpenseDisplay;
