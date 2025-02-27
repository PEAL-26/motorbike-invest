export function isValidDate(date: string): boolean {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([0-9]{4})$/;

  if (!regex.test(date)) {
    return false;
  }

  const [day, month, year] = date.split("/").map(Number);
  const parsedDate = new Date(year, month - 1, day);

  return (
    parsedDate.getFullYear() === year &&
    parsedDate.getMonth() === month - 1 &&
    parsedDate.getDate() === day
  );
}

export function formatDateForDatabase(date: string): string | null {
  if (!isValidDate(date)) {
    return null;
  }
  const [day, month, year] = date.split("/");
  return `${year}-${month}-${day}`;
}

export function formatDateFromDateObject(input: string): string {
  const date = clearDate(input);
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return "";
  }
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function clearDate(date: string | Date) {
  const dateClean = String(date).replaceAll('"', "").replaceAll("'", "");
  return new Date(dateClean);
}

export function daysBetweenDates(current: Date, past: Date): number | null {
  const diffTime = current.getTime() - past.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function inputDateFormat(text: string) {
  const length = text.length;

  // if (length === 2) {
  //   text += "/";
  // }

  // if (length === 5) {
  //   text += "/";
  // }

  return text;
}
