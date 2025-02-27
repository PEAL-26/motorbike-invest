import {
  DATABASE_COLUMNS_TYPE_ENUM,
  DatabaseConfigSelect,
  DatabaseCreateTableColumns,
  DatabaseInclude,
  DatabaseWhere,
  DatabaseWhereField,
  ListPaginateConfigs,
} from "./types";

export function generateQueryFields(select?: DatabaseConfigSelect) {
  if (!select) return ["*"];
  let selectFields: string[] = [];
  const fields = Object.entries(select);

  for (const [field, value] of fields) {
    if (typeof value === "boolean") {
      selectFields.push(field);
      continue;
    }
    if (typeof value === "object") {
      const { as } = value;
      selectFields.push(`${field}${as ? ` AS ${as}` : ""}`);
      continue;
    }
  }

  return selectFields;
}

export function generateWhereClause(where?: DatabaseWhere): string {
  if (!where) return "";

  const conditions = Object.entries(where)
    .map(([key, condition]) => {
      let column = key;
      let value: DatabaseWhereField = condition;
      let op = "equal";
      if (typeof condition === "object") {
        column = condition.as || key;
        value = condition.value !== undefined ? condition.value : undefined;
        op = condition.op || "equal";
      }

      if (value !== undefined) {
        const where = {
          equal: `${column} = '${value}'`,
          like: `LOWER(${column}) LIKE LOWER('%${value}%')`,
        }[op];
        return where || "";
      }

      return "";
    })
    .filter(Boolean);

  return conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
}

let joins: string[] = [];
let fields: string[] = [];
let tables: string[] = [];

export function generateIncludes(
  tableMain: string,
  include?: DatabaseInclude,
  recursive = false,
  clear = true,
) {
  if (clear) {
    joins = [];
    fields = [];
    tables = [];
  }

  if (!recursive) {
    joins = [];
    fields = [];
  }

  if (include) {
    const includes = Object.entries(include);
    for (const [table, attributes] of includes) {
      const { singular, as, include, select, type, references } = attributes;
      const { left, right } = references || {};

      const queryFields = select
        ? generateQueryFields(select).map((field) => `${as || table}.${field}`)
        : [];

      const tableName = `${table} ${as ? `AS ${as}` : ""}`.trim();

      const referenceLeft = left || `${as || table}.id`;
      const referenceRight = right || `${tableMain}.${singular}_id`;
      const join = `${
        type || ""
      } JOIN ${tableName} ON ${referenceLeft} = ${referenceRight} `.trim();

      tables.push(as || table);
      fields.push(...queryFields);
      joins.push(join);

      if (include) {
        generateIncludes(table, include, true, false);
      }
    }
  }

  return { fields, joins: joins.join("\n"), tables };
}

export function serialize(data: any, tableNames: string[]) {
  const mainTable = tableNames[0];
  let obj: Record<string, any> = {};

  for (const [field, value] of Object.entries(data)) {
    if (field.startsWith(mainTable)) {
      const fieldReplaced = field.replaceAll(`${mainTable}_`, "");
      obj[fieldReplaced] = value;
    } else {
      const restTables = tableNames.slice(1);

      if (!restTables.length) {
        obj[field] = value;
      }

      if (restTables.length) {
        for (const table of restTables) {
          if (field.startsWith(table)) {
            const fieldReplaced = field.replaceAll(`${table}_`, "");
            if (field === `${table}_${fieldReplaced}`) {
              setNestedValue(obj, `${table}.${fieldReplaced}`, value);
              break;
            }
          }
        }
      }
    }
  }

  return obj;
}

export function fieldsMap(fields: string[], tables: string[]) {
  const newFields = [];
  for (const field of fields) {
    if (field === "*" && tables.length === 1) {
      newFields.push(`${tables[0]}.*`);
      break;
    }
    const fieldSplitted = field.split(" AS ");
    const main = fieldSplitted[0]?.trim();
    const fieldAs = fieldSplitted[1]?.trim();
    const [table, _field] = (fieldAs || main).split(".");
    const tableFound = tables.find((t) => t === table);

    if (tableFound) {
      if (_field === "*") {
        newFields.push(`${table}.*`);
      } else {
        const newField = `${table}_${_field}`;
        newFields.push(`${main} AS \`${newField}\``);
      }
    }
    {
      if (!_field && table && tables.length === 1) {
        const newField = `${tables[0]}_${table}`;
        newFields.push(`${tables[0]}.${main} AS \`${newField}\``);
      }
    }
  }

  return newFields.join(", ");
}

export function setNestedValue(
  obj: Record<string, any>,
  path: string,
  value: any,
) {
  const keys = path.split(".");
  let current = obj;

  keys.forEach((key, index) => {
    if (!current[key]) {
      current[key] = {};
    }

    if (index === keys.length - 1) {
      current[key] = value;
    }

    current = current[key];
  });

  return obj;
}

export function generateOrderByClause(
  orderBy?: Record<string, "asc" | "desc">[],
): string {
  if (!orderBy || orderBy.length === 0) {
    return "";
  }

  const orderByClauses = orderBy
    .map((item) => {
      const [column, direction] = Object.entries(item)[0];
      return `${column} ${direction.toUpperCase()}`;
    })
    .join(", ");

  return `ORDER BY ${orderByClauses}`;
}

const NOT_STRING_TYPES = ["boolean", "number"];

export function setValueData(value: any) {
  if (value === null) {
    return null;
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return value;
}

export function generateCreateFields(data: Record<string, any>) {
  let fields: string[] = [];
  let values: any[] = [];
  for (const [field, value] of Object.entries(data)) {
    if (value === undefined) {
      continue;
    }

    fields.push(field);

    // if (value === null) {
    //   values.push(null);
    //   continue;
    // }

    // if (value instanceof Date) {
    //   values.push(value.toISOString());
    //   continue;
    // }

    // if (typeof value === "object") {
    //   values.push(JSON.stringify(value));
    //   continue;
    // }

    // if (typeof value !== "object" && NOT_STRING_TYPES.includes(typeof value)) {
    //   values.push(value);
    //   continue;
    // }

    // values.push(`"${value}"`);
    
    values.push(setValueData(value));
  }

  return { fields, values };
}

export function join(array: any[], separator?: string) {
  let data: string = "";

  let index = 1;
  for (const value of array) {
    let _separator = array.length > index ? separator || "" : "";
    data += `${value}${_separator}`;
    index++;
  }

  return data.trim();
}

export function generateCreateTableScript(
  tableName: string,
  columns: DatabaseCreateTableColumns,
): string {
  // Validação básica
  if (!tableName || !columns || Object.keys(columns).length === 0) {
    throw new Error("O nome da tabela e as colunas são obrigatórios.");
  }

  // Gerar as definições de colunas

  const constraints: string[] = [];
  const columnsDefinition = Object.entries(columns).map(
    ([columnName, attributes]) => {
      if (!DATABASE_COLUMNS_TYPE_ENUM[attributes.dataType]) {
        throw new Error(`Tipo de dado inválido: ${attributes.dataType}`);
      }

      if (attributes?.pk) {
        constraints.push(`PRIMARY KEY (\`${columnName}\`)`);
      }

      if (attributes?.fk) {
        /* TODO Implementar depois */
        constraints.push(
          `CONSTRAINT fk_${attributes.fk.table} FOREIGN KEY (\`${columnName}\`) REFERENCES \`${attributes.fk.table}\` (\`${attributes.fk.reference}\`)`,
        );
      }

      const notNull = attributes?.pk
        ? "NOT NULL"
        : attributes?.notNull
          ? "NOT NULL"
          : "NULL";

      const defaultValue =
        attributes?.defaultValue !== undefined
          ? `DEFAULT ${attributes.defaultValue}`
          : "";

      const autoIncrement = ""; //attributes?.autoIncrement ? `AUTO_INCREMENT` : "";

      return `\`${columnName}\` ${
        DATABASE_COLUMNS_TYPE_ENUM[attributes.dataType]
      } ${autoIncrement} ${notNull} ${defaultValue}`.trim();
    },
  );

  const definitions = [...columnsDefinition, ...constraints];
  // Construir o script de criação da tabela
  const createTableScript = `CREATE TABLE IF NOT EXISTS ${tableName} (${definitions.join(
    ", ",
  )});`;

  return createTableScript;
}

export function generateFn(fn?: Record<string, string>) {
  if (!fn) return "";

  let generate = [];
  for (const [field, value] of Object.entries(fn)) {
    generate.push(`${value} AS ${field}`);
  }

  return generate.join(", ");
}

export function generateGroupBy(group?: string[]) {
  if (!group || !group.length) return "";
  return `GROUP BY ${group.join(", ")}`;
}

export function generateQuerySql(
  tableName: string,
  configs?: ListPaginateConfigs,
) {
  const { select, where, include, orderBy, groupBy, fn } = configs || {};
  const fields = generateQueryFields(select);
  const includes = generateIncludes(tableName, include);

  const whereClause = generateWhereClause(where);
  const includesFields =
    includes.fields.length > 0
      ? `, ${fieldsMap(includes.fields, includes.tables)}`
      : "";
  const fns = generateFn(fn);
  const orderByClause = generateOrderByClause(orderBy);
  const groups = generateGroupBy(groupBy);

  const baseQuery = `SELECT ${fieldsMap(fields, [tableName])}${includesFields}${
    fns ? `, ${fns}` : ""
  } FROM ${tableName} ${
    includes.joins
  } ${whereClause} ${groups} ${orderByClause}`.trim();

  return { baseQuery, includes };
}
