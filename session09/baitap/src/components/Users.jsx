import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [filterName, setFilterName] = useState(""); // Lọc theo tên
  const [filterAge, setFilterAge] = useState(""); // Lọc theo tuổi
  const [filterSalary, setFilterSalary] = useState(""); // Lọc theo lương
  useEffect(() => {
    axios
      .get("https://674ea952bb559617b26c215b.mockapi.io/api/v1/users")
      .then((response) => setUsers(response.data))
      .catch((error) => setError(error.message));
  });

  //   //Xóa
  const handleDelete = (id) => {
    axios
      .delete(`https://674ea952bb559617b26c215b.mockapi.io/api/v1/users/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => setError(error.message));
  };

  // Xử lý filter
  const filteredUsers = users.filter((user) => {
    const matchName = user.name
      .toLowerCase()
      .includes(filterName.toLowerCase());
    const matchAge = filterAge ? user.age === parseInt(filterAge) : true;
    const matchSalary = filterSalary
      ? user.salary >= parseFloat(filterSalary)
      : true;

    return matchName && matchAge && matchSalary;
  });
  return (
    <div>
      <div className="container-lg">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-8">
                  <h2>
                    Filter <b>User</b>
                  </h2>
                </div>
                <div className="col-sm-4">
                  <select
                    className="custom-select"
                    id="inputGroupSelect01"
                    defaultValue="" // Giá trị mặc định
                    onChange={(e) => {
                      const filterType = e.target.value;
                      if (filterType === "1") {
                        setFilterName(""); // Xóa các giá trị khác
                        setFilterAge("");
                        setFilterSalary("");
                      } else if (filterType === "2") {
                        setFilterName("");
                        setFilterAge(""); // Chọn lọc theo tuổi
                        setFilterSalary("");
                      } else if (filterType === "3") {
                        setFilterName("");
                        setFilterAge("");
                        setFilterSalary(""); // Chọn lọc theo lương
                      }
                    }}
                  >
                    <option value="">Filter</option>
                    <option value="1">Name</option>
                    <option value="2">Age</option>
                    <option value="3">Salary</option>
                  </select>
                </div>
              </div>
            </div>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Salary</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.age}</td>
                    <td>{user.salary}</td>
                    <td>
                      <a className="add" title="Add" data-toggle="tooltip">
                        <i className="material-icons"></i>
                      </a>
                      <a className="edit" title="Edit" data-toggle="tooltip">
                        <i className="material-icons"></i>
                      </a>
                      <a
                        className="delete"
                        title="Delete"
                        data-toggle="tooltip"
                        onClick={() => handleDelete(user.id)}
                      >
                        <i className="material-icons"></i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
