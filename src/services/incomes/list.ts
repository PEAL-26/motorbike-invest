import { INCOME_STATUS_ENUM } from "@/constants/income";
import { PaginatedResult } from "@/db/database";
import { db } from "@/lib/drizzle";

export type ListIncomeResponseData = {
  id: number;
  code: string;
  number: number;
  income: number;
  incomeDate: Date;
  paymentDate?: Date | null;
  status: INCOME_STATUS_ENUM;
  investment: {
    id: number;
    name: string;
  };
};

export type ListIncomesParams = {
  query?: string;
  size?: number;
  page?: number;
  status?: INCOME_STATUS_ENUM;
};

export async function listIncomes(
  params?: ListIncomesParams,
): Promise<PaginatedResult<ListIncomeResponseData>> {
  const { page, size, query } = params || {};
  return db.listPaginate<ListIncomeResponseData>("incomes", {
    select: {
      id: true,
      number: true,
      code: true,
      income: true,
      income_date: {
        as: "incomeDate",
      },
      payment_date: {
        as: "paymentDate",
      },
      status: true,
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
    page,
    size,
    where: {
      code: {
        op: "like",
        value: query,
      },
      status: params?.status,
    },
    orderBy: [{ income_date: "asc" }],
  });
}
