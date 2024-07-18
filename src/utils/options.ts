import { SelectOption } from "@app/ui/select";

export const recordToOptions = <T extends string = string>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  record: Record<T, any>,
  labelKey?: string
): Array<SelectOption<T>> => {
  return (
    Object.keys(record).map((key) => ({
      label: labelKey ? record[key as T][labelKey] : record[key as T],
      value: key as T,
    })) ?? []
  );
};
