import React, { useEffect, useState } from "react";

export default function DemoFetchApi() {
  const [users, setUsers] = useState([]);
  //Goi API lay danh sach tat ca users
  const fetchUsers = () => {
    fetch("http://localhost:3000/users", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error))
      .finally(() => console.log("Hoan thanh"));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  //   //Goi API de lay thong tin chi tiet user
  //   const handGetInfor = (id) => {};

  return (
    <div>
      <p>DemoFetchApi</p>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.id}>
              <p>{user.id}</p>
              <p>{user.userName}</p>
              <p>{user.dateOfBirth}</p>
              <p>{user.email}</p>
              <p>{user.address}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
