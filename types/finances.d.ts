import { income, expense } from "@/lib/schema";
import { InferModel } from "drizzle-orm";

type Income = InferModel<typeof income>;

type Expense = InferModel<typeof expense>;
