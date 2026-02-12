import type { Column, User } from "../../types/user";

export const userColumns = (onDelete: (id: number) => void): Column<User>[] => [
  { label: "Ad", key: "name" },
  { label: "Soyad", key: "surname" },
  { label: "Email", key: "email" },
  {
    label: "Durum",
    key: "active",
    render: (_, row) => (
      <span className={row.active ? "text-green-600" : "text-red-600"}>
        {row.active ? "Aktif" : "Pasif"}
      </span>
    ),
  },
  {
    label: "Actions",
    key: "id",
    render: (_, row) => (
      <button
        onClick={() => onDelete(row.id)}
        className="px-3 py-1 bg-red-500 text-white rounded"
      >
        Sil
      </button>
    ),
  },
];
