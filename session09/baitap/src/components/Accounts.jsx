import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    axios
      .get("https://674ea952bb559617b26c215b.mockapi.io/api/v1/accounts")
      .then((response) => setAccounts(response.data))
      .catch((error) => setError(error.message));
  });

  const listSearchName = accounts.filter((acc) =>
    acc.name.trim().toLowerCase().includes(searchName.trim().toLowerCase())
  );
  return (
    <div>
      <input
        type="text"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <table>
        <thead>
          <tr>
            <td>STT</td>
            <td>Name</td>
            <td>DateOfBirth</td>
            <td>Gender</td>
          </tr>
        </thead>
        <tbody>
          {listSearchName.map((acc, index) => (
            <tr key={acc.id}>
              <td>{index + 1}</td>
              <td>{acc.name}</td>
              <td>{acc.birthday}</td>
              <td>{acc.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
