export enum INVESTMENT_STATUS_ENUM {
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

export type Investment = {
  id: number;
  code: string;
  number: number;
  income: number;
  name: string;
  incomeDate: Date;
  startDate: Date;
  endDate: Date;
  duration: string;
  status?: INVESTMENT_STATUS_ENUM;
};

export interface InvestmentCardProps {
  data: Investment;
  onPress?(): void;
}
