import { useEffect, useState } from "react";
import { UserService } from "./services/userService";
import ReusableTable from "./components/DataTable/DataTable";
import type { User, Column, UserResponse } from "./types/user";
import ReusableModal from "./components/ReusableModal/ReusableModal";

function App() {
  const columns: Column<User>[] = [
    { label: "Ad", key: "name" },
    { label: "Soyad", key: "surname" },
    { label: "Email", key: "email" },
    {
      label: "Durum",
      key: "active",
      render: (_, row) => {
        const isActive = row.active;
        return (
          <span className={isActive ? "text-green-600" : "text-red-600"}>
            {isActive ? "Aktif" : "Pasif"}
          </span>
        );
      },
    },
    {
      label: "Actions",
      key: "id",
      render: (_, row) => {
        return (
          <button
            onClick={() => openDeleteModal(row.id)}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            sil
          </button>
        );
      },
    },
  ];
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const response: UserResponse = await UserService.getAll({
          page,
          limit: 10,
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

  const openDeleteModal = (id: number) => {
    setSelectedUserId(id);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async () => {
    if (selectedUserId === null) return;

    try {
      await UserService.delete(selectedUserId);

      setUsers((prev) => prev.filter((user) => user.id !== selectedUserId));
    } catch (err) {
      console.log("unsuccessful delete process");
    } finally {
      setIsModalOpen(false);
      setSelectedUserId(null);
    }
  };

  return (
    <div className="mx-28 ">
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
      {/* modal */}

      <ReusableModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-lg font-bold mb-3 "> Delete user</h2>

        <p>are you sure you want delete this user?</p>
        <div className="flex gap-2 justify-end mt-5">
          <button
            className="px-4 py-2 rounded bg-gray-200"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-red-600 text-white"
            onClick={() => handleDeleteUser()}
          >
            Delete
          </button>
        </div>
      </ReusableModal>

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
