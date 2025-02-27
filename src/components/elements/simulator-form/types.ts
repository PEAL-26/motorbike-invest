export type SimulatorFormData = {
  date: string;
  balanceInitial: number;
  investment: number;
  income: number;
  intervalPeriodBeforeInvestment: number;
  duration: number;
  goal: number;
  profit: number;
  bonus: number;
};

export interface SimulatorFormProps {
  onSimulate?(data: SimulatorFormData): void;
}
