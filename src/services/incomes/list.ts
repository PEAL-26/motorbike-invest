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
};

export type ListIncomesParams = {
  query?: string;
  size?: number;
  page?: number;
  status: INCOME_STATUS_ENUM
};

export async function listIncomes(
  params?: ListIncomesParams,
): Promise<PaginatedResult<ListIncomeResponseData>> {
  const { page, size, query } = params || {};
  return db.listPaginate<ListIncomeResponseData>("incomes", {
    select: {
      id: true,
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
    page,
    size,
    where: {
    //   name: {
    //     op: "like",
    //     value: query,
    //   },
      status: params?.status
    },
    // orderBy: [{ created_at: "desc" }],
  });
}
