// import type { Column } from "../../types/user";
interface ReusableTableProps<T> {
  data: T[];
  columns: Column<T>[];
}
export interface Column<T, K extends keyof T = keyof T> {
  label: string;
  key: K;
  render?: (value: T[K], row: T) => React.ReactNode;
}

export default function ReusableTable<T extends { id: string | number }>({
  data,
  columns,
}: ReusableTableProps<T>) {
  return (
    <table className="table-auto w-full border">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={String(col.key)}>{col.label}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((col) => {
              const value = row[col.key];

              return (
                <td key={String(col.key)}>
                  {col.render ? col.render(value, row) : String(value)}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
