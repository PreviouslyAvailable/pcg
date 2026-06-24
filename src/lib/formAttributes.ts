import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';

/** Lowercase `autocomplete` for valid HTML output (React's autoComplete SSRs as camelCase). */
export function autocomplete(
  value: string,
): { autocomplete: string } {
  return { autocomplete: value };
}

export type InputProps = InputHTMLAttributes<HTMLInputElement>;
export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;
export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;
