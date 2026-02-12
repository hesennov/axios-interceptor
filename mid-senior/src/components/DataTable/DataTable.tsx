export interface Column<T, K extends keyof T = keyof T> {
  label: string;
  key: K;
  render?: (value: T[K], row: T) => React.ReactNode;
}
interface ReusableTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading: boolean;
}

export default function ReusableTable<T extends { id: string | number }>({
  data,
  columns,
  loading,
}: ReusableTableProps<T>) {
  if (loading) return <div>loading...</div>;
  if (data.length === 0) return <div>no tengo data amigo</div>;

  return (
    <table className="table-auto w-full border-2">
      <thead>
        <tr className="border-2 px-4 text-center py-2">
          {columns.map((col) => (
            <th key={String(col.key)}>{col.label}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row) => (
          <tr className="even:bg-gray-200" key={row.id}>
            {columns.map((col) => {
              const value = row[col.key];

              return (
                <td className="border px-4 py-2" key={String(col.key)}>
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
