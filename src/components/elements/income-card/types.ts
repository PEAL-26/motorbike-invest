import { INCOME_STATUS_ENUM } from "@/constants/income";

export type Income = {
  id: number;
  investment: {
    id: number;
    name: string;
  };
  code: string;
  number: number;
  income: number;
  incomeDate: string;
  paymentDate?: string | null;
  status: INCOME_STATUS_ENUM;
};

export interface IncomeCardProps {
  data: Income;
  onPress?(): void;
}
