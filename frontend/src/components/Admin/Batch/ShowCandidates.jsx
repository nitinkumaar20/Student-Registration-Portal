import { React, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GetCandidates, userInfo } from "../../../api";

function ShowCandidates() {
  const location = useLocation();
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const data = location.state.userlist;

      if (data.length > Users.length) {
        data.map(async (e) => {
          const { data } = await GetCandidates({ user_id: e.user_id });
          const val = data.userData;
          setUsers((Users) => [...Users, ...val]);
        });
      }
    })();
  }, []);

  return (
    <section className="container m-2">
      <table className="table table-hover  " style={{ margin: "" }}>
        <thead>
          <tr>
            <th>S.no</th>
            <th>Name</th>
            <th>Father' Name</th>
            <th>Category</th>
            <th>DOB</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody style={{ fontSize: "0.9rem" }}>
          {Users.length > 0 ? (
            Users.map((e, i) => {
              return (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{e.name}</td>
                  <td>{e.father}</td>
                  <td>{e.category}</td>
                  <td>{e.dob.split("T")[0]}</td>
                  {/* <td>
                    <button className="btn btn-outline-primary ">Edit</button>
                    <button className="btn btn-outline-primary mx-2">
                      Delete
                    </button>
                    <button className="btn btn-outline-primary ">View</button>
                  </td> */}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={7} className="text-center">
                No Users Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}

export default ShowCandidates;
