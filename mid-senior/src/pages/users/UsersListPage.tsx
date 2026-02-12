import { useState } from "react";
import { useUsers } from "../../hooks/users/useUsers";
import ReusableTable from "../../components/DataTable/DataTable";
import ReusableModal from "../../components/ReusableModal/ReusableModal";
import Pagination from "../../components/Pagination/Pagination";
import { userColumns } from "./users.columns";

export default function UsersListPage() {
  const {
    users,
    loading,
    page,
    totalPages,
    search,
    setPage,
    setSearch,
    deleteUser,
  } = useUsers();

  const [selectedId, setSelectedId] = useState<number | null>(null);

  // 🔹 handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleOpenDeleteModal = (id: number) => {
    setSelectedId(id);
  };

  const handleCloseModal = () => {
    setSelectedId(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedId === null) return;

    await deleteUser(selectedId);
    setSelectedId(null);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      {/* Search */}
      <input
        className="border p-2 mb-4 w-64"
        placeholder="Search..."
        value={search}
        onChange={handleSearchChange}
      />

      {/* Table */}
      <ReusableTable
        data={users}
        loading={loading}
        columns={userColumns(handleOpenDeleteModal)}
      />

      {/* Pagination */}
      <Pagination page={page} totalPages={totalPages} onChange={setPage} />

      {/* Delete Modal */}
      <ReusableModal isOpen={selectedId !== null} onClose={handleCloseModal}>
        <h2 className="font-bold text-lg mb-2">Delete user</h2>
        <p>Are you sure you want to delete this user?</p>

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-4 py-2 rounded bg-gray-300"
            onClick={handleCloseModal}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-red-600 text-white"
            onClick={handleConfirmDelete}
          >
            Delete
          </button>
        </div>
      </ReusableModal>
    </>
  );
}
