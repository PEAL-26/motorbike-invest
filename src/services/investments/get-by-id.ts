import { INVESTMENT_STATUS_ENUM } from "@/constants/investment";
import { db } from "@/lib/drizzle";

export type GetInvestmentResponseData = {
  id: number;
  name: string;
  amount: number;
  income: number;
  profit: number;
  bonus?: number | null;
  duration: number;
  startDate: string;
  endDate: string;
  status?: INVESTMENT_STATUS_ENUM | null;
  createdAt: number;
  updatedAt: number;
};

export async function getInvestmentById(id: number) {
  return db.getFirst<GetInvestmentResponseData>("investments", {
    select: {
      id: true,
      name: true,
      amount: true,
      income: true,
      profit: true,
      bonus: true,
      start_date: {
        as: "startDate",
      },
      end_date: {
        as: "endDate",
      },
      duration: true,
      status: true,
      created_at: {
        as: "createdAt",
      },
      updated_at: {
        as: "updatedAt",
      },
    },
    where: { id },
  });
}
