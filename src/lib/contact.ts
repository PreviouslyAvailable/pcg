export const LENDING_AMOUNT_OPTIONS = [
  { value: '5-10', label: '$5M – $10M' },
  { value: '10-25', label: '$10M – $25M' },
  { value: '25-50', label: '$25M – $50M' },
  { value: '50-75', label: '$50M – $75M' },
  { value: '75+', label: '$75M+' },
] as const;

export const LENDING_LABELS: Record<string, string> = Object.fromEntries(
  LENDING_AMOUNT_OPTIONS.map((option) => [option.value, option.label]),
);

export const ROLE_LABELS: Record<string, string> = {
  borrower: 'Borrower',
  investor: 'Investor',
  advisor: 'Professional Advisor',
};
