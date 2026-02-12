import { useState } from "react";
import { UserService } from "../../services/userService";
import { useNavigate } from "react-router-dom";

export default function UserCreatePage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const submit = async () => {
    await UserService.create({
      name,
      surname: "",
      email: "",
    });
    navigate("/users");
  };

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Add User</h1>
      <input
        className="border p-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={submit} className="ml-2 bg-blue-600 text-white px-4">
        Save
      </button>
    </>
  );
}
