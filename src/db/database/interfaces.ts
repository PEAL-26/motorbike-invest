import {
  DatabaseConfig,
  Field,
  ListPaginateConfigs,
  PaginatedResult,
  UpdateBulkData,
} from "./types";

export abstract class IDatabase {
  abstract transaction(callback: () => Promise<void>): Promise<void>;
  abstract sqlUnsafe(sql: string): Promise<void>;
  abstract query<T>(sql: string): Promise<T[]>;
  abstract listAll<T>(
    tableName: string,
    configs?: DatabaseConfig,
  ): Promise<T[]>;
  abstract listPaginate<T>(
    tableName: string,
    configs?: ListPaginateConfigs,
  ): Promise<PaginatedResult<T>>;
  abstract listAllEach<T>(
    tableName: string,
    configs?: ListPaginateConfigs,
  ): AsyncIterableIterator<T>;
  abstract insert<T>(tableName: string, data: Record<string, any>): Promise<T>;
  abstract insertBulk(
    tableName: string,
    data: Record<string, any>[],
  ): Promise<void>;
  abstract update<T>(
    tableName: string,
    data: Record<string, any>,
    id: number,
  ): Promise<T>;
  abstract updateBulk<T>(
    tableName: string,
    data: UpdateBulkData[],
  ): Promise<T[]>;
  abstract delete(tableName: string, where: Record<string, any>): Promise<void>;
  abstract select<T>(fields: Field<T>, tableName: string): Promise<T[]>;
  abstract getFirst<T>(
    tableName: string,
    configs?: DatabaseConfig,
  ): Promise<T | null>;
}
