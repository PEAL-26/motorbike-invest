import { INVESTMENT_STATUS_ENUM } from "@/constants/investment";
import { db } from "@/lib/drizzle";

export type RegisterInvestmentInput = {
  id?: number;
  name: string;
  amount: number;
  income: number;
  profit: number;
  bonus?: number;
  duration: number;
  startDate: Date;
  endDate: Date;
  status: INVESTMENT_STATUS_ENUM;
};

export async function registerInvestment(input: RegisterInvestmentInput) {
  const {
    id,
    name,
    amount,
    income,
    profit,
    bonus,
    duration,
    startDate: start_date,
    endDate: end_date,
  } = input;
  if (!name?.trim()) throw new Error("Nome obrigatório.");
  if (!amount) throw new Error("Valor do investimento obrigatório.");
  if (!income) throw new Error("Rendimento mensal obrigatório.");
  if (!profit) throw new Error("Lucro obrigatório.");
  if (!duration) throw new Error("Duração obrigatória.");
  if (!start_date) throw new Error("Data de início obrigatória.");
  if (!end_date) throw new Error("Data de término obrigatória.");
  const payload = {
    name,
    amount,
    income,
    profit,
    bonus,
    duration,
    start_date,
    end_date,
  };

  if (id) {
    await db.update("investments", payload, id);
  } else {
    await db.insert("investments", payload);
  }

  // await db.transaction(async () => {

  // });
}
