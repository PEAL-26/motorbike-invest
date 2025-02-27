import { INCOME_STATUS_ENUM } from "@/constants/income";
import { db } from "@/lib/drizzle";

export type GetIncomeResponseData = {
  id: number;
  investment: { id: number; name: string };
  code: string;
  number: number;
  income: number;
  status?: INCOME_STATUS_ENUM | null;
  paymentDate: string | null;
  incomeDate: string;
  createdAt: number;
  updatedAt: number;
};

export async function getIncomeById(id: number) {
  return db.getFirst<GetIncomeResponseData>("incomes", {
    select: {
      id: true,
      code: true,
      number: true,
      income: true,
      status: true,
      payment_date: {
        as: "paymentDate",
      },
      income_date: {
        as: "incomeDate",
      },
      created_at: {
        as: "createdAt",
      },
      updated_at: {
        as: "updatedAt",
      },
    },
    include: {
      investments: {
        as: "investment",
        singular: "investment",
        select: {
          id: true,
          name: true,
        },
      },
    },
    where: { incomes: { as: "incomes.id", value: id } },
  });
}
