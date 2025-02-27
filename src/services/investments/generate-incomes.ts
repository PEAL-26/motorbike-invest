import { INCOME_STATUS_ENUM } from "@/constants/income";

export type IncomeInput = {
  investmentId: number;
  date: Date;
  duration: number;
  income: number;
  bonus?: number | null;
};

export type IncomeOutput = {
  investment_id: number;
  code: string;
  number: number;
  income: number;
  status: INCOME_STATUS_ENUM;
  payment_date: Date | null;
  income_date: Date | null;
};

export function generateIncomes(input: IncomeInput) {
  const { investmentId, date, duration, income, bonus } = input;
  const incomes: IncomeOutput[] = [];
  const WAIT_UNTIL_FIRST_PAYMENT = 2; // tempo em meses
  const oldDate = new Date(date);

  for (let i = 1; i <= duration; i++) {
    const isLast = i === duration;
    const newDate = new Date(
      i === 1
        ? oldDate.setMonth(oldDate.getMonth() + WAIT_UNTIL_FIRST_PAYMENT)
        : oldDate.setMonth(oldDate.getMonth() + 1),
    );
    incomes.push({
      investment_id: investmentId,
      code: newDate.getTime().toString(),
      number: i,
      income: isLast ? income + (bonus || 0) : income,
      status: INCOME_STATUS_ENUM.PENDING,
      income_date: newDate,
      payment_date: null,
    });
  }

  return incomes;
}