import React from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";

function IT() {
  const arr = [
    {
      s_no: "1",
      name: "Rohan Gupta",
      App_no: "NHW98202223003",
      Couse: "web design",
    },
    {
      s_no: "2",
      name: "Rohan Gupta",
      App_no: "NHW98202223003",
      Couse: "web design",
    },
    {
      s_no: "3",
      name: "Rohan Gupta",
      App_no: "NHW98202223003",
      Couse: "web design",
    }
  ];

  return (
    <div className="py-4 container my-4">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h3 className="h1"># Total enteries</h3>
        </div>
        <div>
          <form className="form-inline my-2 my-lg-0 d-flex">
            <input
              className="form-control mr-sm-2 mx-2"
              type="search"
              placeholder="Name/Application Number"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </div>
{/* 
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">S no.</th>
              <th scope="col">Name</th>
              <th scope="col">Application no.</th>
              <th scope="col">View</th>
            </tr>
          </thead>
          <tbody>
            {arr.map((e, i) => {
              return (
                <tr key={i}>
                  <th scope="row">{e.s_no}</th>
                  <td>{e.name}</td>
                  <td>{e.App_no}</td>
                  <td>
                    <button className="btn btn-outline-primary mx-2">
                      <Link
                        to="/admin/courses/users/edit"
                        target="_blank"
                        style={{ textDecoration: "none" }}
                      >
                        Edit
                      </Link>
                    </button>
                    <button className="btn btn-outline-primary ">Delete</button>
                    <button className="btn btn-outline-primary mx-2">
                      Export
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div> */}
    </div>
  );
}

export default IT;
