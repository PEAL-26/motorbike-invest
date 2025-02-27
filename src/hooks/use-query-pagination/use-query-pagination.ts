import { PaginatedResult } from "@/db/database";
import {
  InfiniteData,
  keepPreviousData,
  useInfiniteQuery as useInfiniteQueryRQ,
} from "@tanstack/react-query";
import { useMemo } from "react";
import { QueryFnContext, QueryPaginationProps } from "./types";

export function useQueryPagination<T>(props: QueryPaginationProps<T>) {
  const { queryKey, fn, ...restProps } = props;

  const queryFn = async ({ pageParam: page = 1, ...rest }: QueryFnContext) => {
    return fn?.({ page, ...rest });
  };

  const select = (
    data?: InfiniteData<PaginatedResult<T> | undefined, number>,
  ) => {
    if (!data) return undefined;

    return {
      ...data.pages.slice(-1)[0],
      data: data.pages.flatMap((page) => {
        if (!page?.data) return [];

        return [...page.data];
      }),
    };
  };

  const {
    data: response,
    hasNextPage,
    hasPreviousPage,
    isLoading: responseIsLoading,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    isError,
    fetchNextPage,
    fetchPreviousPage,
    refetch,
    ...rest
  } = useInfiniteQueryRQ({
    queryFn,
    queryKey,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage?.next ?? undefined,
    getPreviousPageParam: (firstPage) => firstPage?.prev ?? undefined,
    select,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    ...restProps,
  });

  const nextPage = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const prevPage = () => {
    if (hasPreviousPage && !isFetchingPreviousPage) {
      fetchPreviousPage();
    }
  };

  const isLoading =
    responseIsLoading || isFetchingNextPage || isFetchingPreviousPage;

  const { data, ...pagination } = useMemo(() => {
    const { currentPage, totalPages, totalItems, next, prev } = response || {};
    const data = response?.data || [];
    return { currentPage, totalPages, totalItems, next, prev, data };
  }, [response]);

  if (isError) {
    console.error(rest.error);
  }

  return {
    ...pagination,
    data,
    isLoading: responseIsLoading,
    isLoadingAll: isLoading,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    isError,
    nextPage,
    prevPage,
    refetch: async () => {
      await refetch();
    },
    loadNextPageData: nextPage,
    isEmpty: !isError && !isLoading && data.length === 0,
    ...rest,
  };
}
