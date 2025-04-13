export type FilterType = 'all' | 'people' | 'circles' | 'messages' | 'updates';

const filters = ensureAllFilters(['all', 'circles', 'messages', 'people', 'updates']);

export function ensureAllFilters<T extends readonly FilterType[]>(
  arr: T & IncludesAll<FilterType, T>
): T {
  return arr;
}

type IncludesAll<Union, T extends readonly any[]> =
  Exclude<Union, T[number]> extends never ? {} : ["Missing", Exclude<Union, T[number]>];