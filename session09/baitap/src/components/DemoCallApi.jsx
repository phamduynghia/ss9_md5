import axios from "axios";
import React, { useEffect, useState } from "react";

export default function DemoCallApi() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://674ea952bb559617b26c215b.mockapi.io/api/v1/users")
      .then((response) => setUsers(response.data))
      .catch((error) => setError(error.message));
  }, []);
  return (
    <div>
      <table>
        <thead>
          <th>STT</th>
          <th>Name</th>
          <th>Avatar</th>
          <th>Create At</th>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>
                <img
                  src={user.avatar}
                  alt={user.name}
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
              </td>
              <td>{user.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
