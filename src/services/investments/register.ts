import { INVESTMENT_STATUS_ENUM } from "@/constants/investment";
import { db } from "@/lib/drizzle";
import { generateIncomes } from "./generate-incomes";

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
    status = INVESTMENT_STATUS_ENUM.PENDING,
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
    status,
  };

  let investment = null;
  if (id) {
    investment = await db.getFirst("investments", {
      where: {
        id,
      },
    });

    if (!investment) {
      throw new Error("Investimento não encontrado.");
    }

    await db.update<any>("investments", payload, id);
  } else {
    investment = await db.insert<any>("investments", payload);
  }

  if (status === INVESTMENT_STATUS_ENUM.ACTIVE) {
    const incomes = generateIncomes({
      date: start_date,
      duration,
      income,
      investmentId: investment?.id,
      bonus,
    });

    await db.delete("incomes", { investment_id: investment.id });
    await db.insertBulk("incomes", incomes);
    // if (id) {
    //   // Atualizar
    // } else {
    // }
  }
}
