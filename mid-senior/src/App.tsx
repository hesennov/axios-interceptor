import { useEffect, useState } from "react";
import { UserService } from "./services/userService";
import ReusableTable from "./components/DataTable/DataTable";
import type { User, Column, UserResponse } from "./types/user";

const columns: Column<User>[] = [
  { label: "Ad", key: "name" },
  { label: "Soyad", key: "surname" },
  { label: "Email", key: "email" },
  {
    label: "Durum",
    key: "active",
    // Geniş tip veya hiç kullanma
    render: (value, row) => {
      // value: string | number | boolean (Column interface'den gelen tip)
      const isActive = value as boolean; // Cast et veya row.active kullan
      return (
        <span className={isActive ? "text-green-600" : "text-red-600"}>
          {isActive ? "Aktif" : "Pasif"}
        </span>
      );
    },
  },
];
function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const response: UserResponse = await UserService.getAll({
          page,
          limit: 5,
          search,
        });
        setUsers(response.data);
        setTotalPages(response.totalPages);
      } catch (err) {
        console.error("Veri çekilemedi:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [page, search]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Kullanıcılar</h1>

      {/* Arama */}
      <input
        type="text"
        placeholder="Ara..."
        className="border border-gray-300 px-4 py-2 rounded mb-4 w-64"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      {/* Tablo */}
      <ReusableTable data={users} columns={columns} loading={loading} />

      {/* Sayfalama */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Önceki
        </button>
        <span>
          Sayfa {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Sonraki
        </button>
      </div>
    </div>
  );
}

export default App;
