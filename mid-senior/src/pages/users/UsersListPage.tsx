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

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      <input
        className="border p-2 mb-4"
        placeholder="Search..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      <ReusableTable
        data={users}
        loading={loading}
        columns={userColumns((id) => setSelectedId(id))}
      />

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />

      <ReusableModal isOpen={!!selectedId} onClose={() => setSelectedId(null)}>
        <p>Are you sure?</p>
        <button
          className="bg-red-600 text-white px-4 py-2"
          onClick={() => {
            if (selectedId) deleteUser(selectedId);
            setSelectedId(null);
          }}
        >
          Delete
        </button>
      </ReusableModal>
    </>
  );
}
