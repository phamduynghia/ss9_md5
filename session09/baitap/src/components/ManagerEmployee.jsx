import axios from "axios";
import React, { useEffect, useState } from "react";

export default function ManagerEmployee() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [idEdit, setIdEdit] = useState("");
  const [search, setSearch] = useState("");
  const [employee, setEmployee] = useState({
    codeEmp: "",
    name: "",
    birthday: "",
    gender: null,
    address: "",
  });

  useEffect(() => {
    axios
      .get("https://674ea952bb559617b26c215b.mockapi.io/api/v1/employees")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => setError(error.message));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Kiểm tra nếu trường là radio, thì sử dụng checked thay vì value
    if (type === "radio") {
      setEmployee({
        ...employee,
        [name]: value === "true" ? true : false, // Chuyển "true" thành true và "false" thành false
      });
    } else {
      setEmployee({ ...employee, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (idEdit) {
      axios
        .put(
          `https://674ea952bb559617b26c215b.mockapi.io/api/v1/employees/${idEdit}`,
          employee
        )
        .then((response) => {
          const updatedEmployees = employees.map((emp) =>
            emp.id === response.data.id ? response.data : emp
          );
          setEmployees(updatedEmployees);
          // Reset lại các trường sau khi thêm mới
          setEmployee({
            codeEmp: "",
            name: "",
            birthday: "",
            gender: null,
            address: "",
          });
        })
        .catch((error) => setError(error.message));
    } else {
      axios
        .post(
          `https://674ea952bb559617b26c215b.mockapi.io/api/v1/employees`,
          employee
        )
        .then((response) => {
          setEmployees([...employees, response.data]);
          // Reset lại các trường sau khi thêm mới
          setEmployee({
            codeEmp: "",
            name: "",
            birthday: "",
            gender: null,
            address: "",
          });
        })
        .catch((error) => setError(error.message));
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(
        `https://674ea952bb559617b26c215b.mockapi.io/api/v1/employees/${id}`
      )
      .then((response) => {
        const updatedEmployees = employees.filter((e) => e.id !== id);
        setEmployees(updatedEmployees);
      })
      .catch((error) => setError(error.message));
  };

  const listEmployees = employees.filter((e) =>
    e.name.trim().toLowerCase().includes(search.trim().toLowerCase())
  );

  const handleEdit = (id) => {
    const employeeEdit = employees.find((e) => e.id === id);
    if (employeeEdit) {
      setIdEdit(id);
      setEmployee({
        codeEmp: employeeEdit.codeEmp,
        name: employeeEdit.name,
        birthday: employeeEdit.birthday,
        gender: employeeEdit.gender ? "true" : "false",
        address: employeeEdit.address,
      });
    }
  };

  return (
    <div className="main">
      <div className="container-lg">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-6">
                  <button className="btn btn-primary">
                    Thêm mới nhân viên
                  </button>
                </div>
                <div className="col-sm-6">
                  <div className="search-box">
                    <div className="input-group">
                      <input
                        type="text"
                        id="search"
                        className="form-control"
                        placeholder="Tìm kiếm theo tên"
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <span className="input-group-addon">
                        <i className="material-icons"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <table className="table table-striped">
              <thead>
                <tr>
                  <th title="Số thứ tự">STT</th>
                  <th style={{ width: "22%" }}>Mã nhân viên</th>
                  <th>Tên Nhân Viên</th>
                  <th>Ngày sinh</th>
                  <th>Giới tính</th>
                  <th>Địa chỉ</th>
                  <th>Lựa chọn</th>
                </tr>
              </thead>
              <tbody>
                {listEmployees.map((e, index) => (
                  <tr key={e.id}>
                    <td>{index + 1}</td>
                    <td>{e.codeEmp}</td>
                    <td>{e.name}</td>
                    <td>{e.birthday} </td>
                    <td>{e.gender ? "Nam" : "Nữ"}</td>
                    <td>{e.address}</td>
                    <td>
                      <a
                        className="edit"
                        title="Edit"
                        onClick={() => handleEdit(e.id)}
                      >
                        <i className="material-icons"></i>
                      </a>
                      <a
                        className="delete"
                        title="Delete"
                        onClick={() => handleDelete(e.id)}
                      >
                        <i className="material-icons"></i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="form">
              <h4>Thêm nhân viên</h4>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Mã nhân viên"
                  name="codeEmp"
                  value={employee.codeEmp}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tên nhân viên"
                  name="name"
                  value={employee.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="date"
                  className="form-control"
                  placeholder="Ngày sinh"
                  name="birthday"
                  value={employee.birthday}
                  onChange={handleChange}
                  required
                />
                <div className="form-group">
                  <label className="form-check-label" htmlFor="male">
                    Giới tính
                  </label>
                  <br />
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <label htmlFor="male" className="lable-gender">
                      Nam
                    </label>
                    <input
                      type="radio"
                      className="radio"
                      name="gender"
                      id="male"
                      value="true"
                      checked={employee.gender === true}
                      onChange={handleChange}
                    />
                    <label htmlFor="female" className="lable-gender">
                      Nữ
                    </label>
                    <input
                      type="radio"
                      className="radio"
                      name="gender"
                      id="female"
                      value="false"
                      checked={employee.gender === false}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Địa chỉ"
                  name="address"
                  value={employee.address}
                  onChange={handleChange}
                  required
                />
                <button type="submit" className="btn btn-primary">
                  {idEdit ? "Cập Nhật" : "Thêm Mới"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
