import { useEffect, useState } from "react";
import { UserService } from "../../services/userService";
import type { User } from "../../types/user";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await UserService.getAll({ page, search, limit: 10 });
        setUsers(res.data);
        setTotalPages(res.totalPages);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, search]);

  const deleteUser = async (id: number) => {
    await UserService.delete(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return {
    users,
    loading,
    page,
    totalPages,
    search,
    setPage,
    setSearch,
    deleteUser,
  };
}
