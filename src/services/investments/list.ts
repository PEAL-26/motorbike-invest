import { INVESTMENT_STATUS_ENUM } from "@/constants/investment";
import { PaginatedResult } from "@/db/database";
import { db } from "@/lib/drizzle";

export type ListInvestmentResponseData = {
  id: number;
  income: number;
  name: string;
  incomeDate: Date;
  startDate: Date;
  endDate: Date;
  duration: string;
  status?: INVESTMENT_STATUS_ENUM;
};

export type ListInvestmentsParams = {
  query?: string;
  size?: number;
  page?: number;
  status?: INVESTMENT_STATUS_ENUM;
};

export async function listInvestments(
  params?: ListInvestmentsParams,
): Promise<PaginatedResult<ListInvestmentResponseData>> {
  const { page, size, query } = params || {};
  return db.listPaginate<ListInvestmentResponseData>("investments", {
    select: {
      id: true,
      income: true,
      name: true,
      start_date: {
        as: "startDate",
      },
      end_date: {
        as: "endDate",
      },
      duration: true,
      status: true,
    },
    page,
    size,
    where: {
      name: {
        op: "like",
        value: query,
      },
      status: params?.status,
    },
    orderBy: [{ start_date: "asc" }],
  });
}
