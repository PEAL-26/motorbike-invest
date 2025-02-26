import { DatabaseSQLite } from "@/db/database";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";

const expo = openDatabaseSync("motorbike.db");
export const dbDrizzle = drizzle(expo, {
  casing: "camelCase",
  logger: true,
  schema,
});
export const db = new DatabaseSQLite(expo);

async function insert(entity: any, values: any) {
  return dbDrizzle.insert(entity).values(values);
}

async function update(entity: any, values: Record<string, any>, id: any) {
  return dbDrizzle.update(entity).set(values).where(eq(entity.id, id));
}

async function _delete(entity: any, id: any) {
  return dbDrizzle.delete(entity).where(eq(entity.id, id));
}

async function select(entity: typeof schema, columns: Record<string, any>) {
  //   return db.query.{entity}.;
}

export { _delete as delete, insert, update };

export const crud = {
  insert,
  update,
  delete: _delete,
};
