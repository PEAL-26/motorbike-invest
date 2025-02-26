import { PaginatedResult } from "@/db/database";
import { QueryFunctionContext } from "@tanstack/react-query";

type QueryKey = readonly unknown[];
type TPageParam = number;
export type QueryFnContext = QueryFunctionContext<QueryKey, TPageParam>;
export type FnProps = Omit<Partial<QueryFnContext>, "pageParam"> & {
  page?: number;
};

export interface QueryPaginationProps<D, R = PaginatedResult<D>> {
  queryKey: QueryKey;
  fn?: (props: FnProps) => Promise<R> | undefined;
  refetchOnWindowFocus?: boolean;
}

export interface QueryPaginationResponse<T> {
  data: T[];
  loadNextPageData?: () => void;
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  isRefetching?: boolean;
  isFetching?: boolean;
  refetch?: () => void;
}
