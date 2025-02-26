import { INCOME_STATUS_ENUM } from "@/constants/income";

export type Income = {
  id: number;
  code: string;
  number: number;
  income: number;
  incomeDate: Date;
  paymentDate?: Date | null;
  status: INCOME_STATUS_ENUM;
};

export interface IncomeCardProps {
  data: Income;
  onPress?(): void;
}
