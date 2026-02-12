import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserService } from "../../services/userService";

export default function UserEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    UserService.getById(Number(id)).then((res) => setName(res.name));
  }, [id]);

  const save = async () => {
    await UserService.put(Number(id), { name });
    navigate("/users");
  };

  return (
    <>
      <h1>Edit User</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={save}>Save</button>
    </>
  );
}
