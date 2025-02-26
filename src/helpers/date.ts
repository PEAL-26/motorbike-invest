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

export function clearDate(date: string | Date) {
  const dateClean = String(date).replaceAll('"', "");
  return new Date(dateClean);
}
