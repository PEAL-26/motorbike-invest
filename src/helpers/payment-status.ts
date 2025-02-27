import { INCOME_STATUS_ENUM } from "@/constants/income";
import { clearDate, daysBetweenDates } from "./date";

type Input = {
  status?: INCOME_STATUS_ENUM | null;
  incomeDate: string;
  paymentDate?: string | null;
};

export function verifyIncomeStatus(input?: Input | null) {
  if (!input) {
    return { status: "PENDING" as const, daysLate: 0, label: "Pendente" };
  }

  const { status, paymentDate } = input || {};
  const incomeDate = clearDate(input.incomeDate);
  const date = new Date().getTime();
  const newIncomeDate = new Date(
    clearDate(incomeDate).setDate(clearDate(incomeDate).getDate() + 1),
  );

  const daysLate = daysBetweenDates(
    new Date(),
    new Date(incomeDate.setDate(incomeDate.getDate() + 1)),
  );

  if (
    status === INCOME_STATUS_ENUM.PENDING &&
    !paymentDate &&
    date > newIncomeDate.getTime()
  ) {
    return { status: "LATE" as const, daysLate, label: "Atrasado" };
  }

  if (status === INCOME_STATUS_ENUM.PAID) {
    return { status: "PAID" as const, daysLate, label: "Pago" };
  }

  return { status: "PENDING" as const, daysLate, label: "Pendente" };
}
