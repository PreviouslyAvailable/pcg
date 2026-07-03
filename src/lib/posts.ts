/** Turns a slug-style category (e.g. `educational-resource`) into a display label. */
export function formatPostCategory(category?: string): string {
  return category?.replace(/-/g, ' ') ?? '';
}
