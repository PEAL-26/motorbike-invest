export enum INCOME_STATUS_ENUM {
  PENDING = "PENDING",
  PAID = "PAID",
}

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
