export function formatDateShort(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-NZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function formatDateMonthYear(dateStr: string) {
  return new Date(dateStr)
    .toLocaleDateString('en-NZ', { month: 'long', year: 'numeric' })
    .toUpperCase();
}
