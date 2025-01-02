import { useState } from "react";
import { SimulatorFormData, SimulatorFormProps } from "./types";

export function useSimulatorForm(props: SimulatorFormProps) {
  const { onSimulate } = props;
  const [formData, setFormData] = useState<Partial<SimulatorFormData>>({});

  const handleSimulate = () => {
    const {
      date = new Date(),
      investment = 0,
      income = 0,
      intervalPeriodBeforeInvestment = 0,
      duration = 0,
      goal = 0,
      balanceInitial = 0,
      profit = 0,
      bonus = 0,
    } = formData;

    onSimulate?.({
      investment,
      income,
      intervalPeriodBeforeInvestment,
      duration,
      goal,
      date,
      balanceInitial,
      profit,
      bonus,
    });
  };

  const handleFormData = (data: Record<string, string>) => {
    let newData: Record<string, number> = {};

    Object.entries(data).forEach(([property, value]) => {
      newData[property] = isNaN(Number(value)) ? 0 : Number(value);
    });

    setFormData((prev) => ({ ...prev, ...newData }));
  };

  return { handleSimulate, formData, handleFormData };
}
