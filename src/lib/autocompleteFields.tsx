'use client';

import {
  useLayoutEffect,
  useRef,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react';

function useAutocompleteRef<T extends HTMLElement>(autoComplete: string) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    ref.current?.setAttribute('autocomplete', autoComplete);
  }, [autoComplete]);

  return ref;
}

/**
 * Form controls with lowercase `autocomplete` in the DOM for Chrome autofill.
 * React's `autoComplete` prop alone serializes as camelCase in SSR HTML.
 */
export function AutocompleteInput(
  props: InputHTMLAttributes<HTMLInputElement> & { autoComplete: string },
) {
  const { autoComplete, ...rest } = props;
  const ref = useAutocompleteRef<HTMLInputElement>(autoComplete);

  return <input ref={ref} autoComplete={autoComplete} {...rest} />;
}

export function AutocompleteSelect(
  props: SelectHTMLAttributes<HTMLSelectElement> & { autoComplete: string },
) {
  const { autoComplete, ...rest } = props;
  const ref = useAutocompleteRef<HTMLSelectElement>(autoComplete);

  return <select ref={ref} autoComplete={autoComplete} {...rest} />;
}

export function AutocompleteTextarea(
  props: TextareaHTMLAttributes<HTMLTextAreaElement> & { autoComplete: string },
) {
  const { autoComplete, ...rest } = props;
  const ref = useAutocompleteRef<HTMLTextAreaElement>(autoComplete);

  return <textarea ref={ref} autoComplete={autoComplete} {...rest} />;
}
