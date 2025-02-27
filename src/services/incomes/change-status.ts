import { INCOME_STATUS_ENUM } from "@/constants/income";
import { db } from "@/lib/drizzle";

export type IncomeChangeStatusInput = {
  id: number;
  paymentDate: Date | null;
  status: INCOME_STATUS_ENUM;
};

export async function incomeChangeStatus(input: IncomeChangeStatusInput) {
  const {
    id,
    paymentDate: payment_date,
    status = INCOME_STATUS_ENUM.PENDING,
  } = input;
  if (!id) throw new Error("Id obrigatório.");
  if (status === INCOME_STATUS_ENUM.PAID) {
    if (!payment_date) throw new Error("Data de pagamento obrigatória.");
  }
  const payload = { payment_date, status, updated_at: new Date().getTime() };
  const income = await db.getFirst("incomes", {
    where: {
      id,
    },
  });
  if (!income) {
    throw new Error("Rendimento não encontrado.");
  }
  await db.update<any>("incomes", payload, id);
}
