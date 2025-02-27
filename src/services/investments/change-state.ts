import { INCOME_STATUS_ENUM } from "@/constants/income";

type Input = {
  id: number;
  state: INCOME_STATUS_ENUM;
};

export async function incomeChangeState(input: Input) {}
