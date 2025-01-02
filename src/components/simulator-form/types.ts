export type SimulatorFormData = {
  date: Date
  balanceInitial: number
  investment: number;
  income: number;
  intervalPeriodBeforeInvestment: number;
  duration: number;
  goal: number;
  profit:number
  bonus: number
};

export interface SimulatorFormProps {
  onSimulate?(data: SimulatorFormData): void;
}
