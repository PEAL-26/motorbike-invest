import { INVESTMENT_STATUS_ENUM } from "@/constants/investment";

export type Investment = {
  id: number;
  // code: string;
  // number: number;
  income: number;
  name: string;
  startDate: Date;
  endDate: Date;
  duration: string;
  status?: INVESTMENT_STATUS_ENUM;
};

export interface InvestmentCardProps {
  data: Investment;
  onPress?(): void;
}
