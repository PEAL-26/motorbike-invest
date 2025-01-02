export type SimulatorItem = {
  number: number;
  investmentsTotal: number;
  investments?: number;
  income: number;
  balance: number;
  date: Date;
};

export interface SimulatorCardProps {
  data: SimulatorItem;
  onPress?(): void;
}
