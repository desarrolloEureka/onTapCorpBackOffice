export interface SearchableProps extends React.HTMLProps<HTMLDivElement> {
  value: string;
  placeholder: string;
  notFoundText: string;
  noInput?: boolean;
  options: { value: string; label: string }[];
  listMaxHeight?: number;
}
