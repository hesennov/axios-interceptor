interface Column<T> {
  label: string;
  key: keyof T;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface ReusableTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
}

export default function ReusableTable<T extends { id: string | number }>({
  data,
  columns,
  loading,
}: ReusableTableProps<T>) {
  if (loading) return <div>loading....</div>;
  if (data.length === 0) return <div>no tengo data amigo</div>;
  return (
    <table className="table-auto w-full border-2">
      <thead>
        <tr className="text-center,border px-4 py-2">
          {columns.map((col) => (
            <th key={String(col.key)} className="border px-4 py-2 text-left">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id} className="hover:bg-gray-50">
            {columns.map((col) => {
              const value = row[col.key];
              return (
                <td key={String(col.key)} className="px-4 py-2 border">
                  {col.render ? col.render(value, row) : String(value ?? "-")}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
