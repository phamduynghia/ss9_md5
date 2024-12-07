import React, { useEffect } from "react";
import baseUrl from "../apis/instance";

export default function DemoAxios() {
  const fetchUsers = async () => {
    try {
      //   const response = await axios.get("http://localhost:3000/users");
      const response = await baseUrl[GET]("users");
      console.log(response.data);
    } catch (error) {
      //Xử lý lỗi
    }
  };
  //   axios
  //     .get("http://localhost:3000/users")
  //     .then((response) => console.log(response))
  //     .catch((error) => console.log(error));

  useEffect(() => {
    fetchUsers();
  }, []);
  return <div>DemoAxios</div>;
}
