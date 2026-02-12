import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import UsersListPage from "./pages/users/UsersListPage";
import UserCreatePage from "./pages/users/UserCreatePage";
import UserEditPage from "./pages/users/UserEditPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/users" element={<UsersListPage />} />
          <Route path="/users/create" element={<UserCreatePage />} />
          <Route path="/users/:id/edit" element={<UserEditPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
