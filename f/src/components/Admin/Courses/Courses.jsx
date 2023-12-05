import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCategories, getCourses } from "../../../api";
import Model from "../items/Model";

function AdminCourses({ Salert }) {
  const [searchValue, setSearchValue] = useState("");
  const [CATEGORY, setCATEGORY] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await getCourses({});
      setCourseList(data.result);
      {
        const { data } = await getCategories();
        setCategoryList(data.result);
      }
    })();
  }, []);

  useEffect(() => {
    if (CATEGORY != "") {
      (async () => {
        const { data } = await getCourses({ category: CATEGORY });
        console.log(data.result);
        setCourseList(data.result);
      })();
    }
  }, [CATEGORY]);

  const searchCourse = async (e) => {
    e.preventDefault();
    const { data } = await getCourses({ course_name: searchValue });
    setCourseList(data.result);
  };

  return (
    <>
      <div className="container">
        {/* ------------------------------------ nav to search courses ------------------------------------- */}
        <nav className="navbar  justify-content-between mt-4">
          <div>
            <select
              value={CATEGORY}
              className="form-control"
              onChange={(e) => setCATEGORY(e.target.value)}
            >
              <option value={""}>------ Choose One -----</option>
              {categoryList.length > 0 &&
                categoryList.map((e, i) => {
                  return (
                    <option key={i} value={e._id}>
                      {e.category.toUpperCase()} COURSE
                    </option>
                  );
                })}
            </select>
          </div>

          <form className="form-inline d-flex" onSubmit={searchCourse}>
            <input
              className="form-control mr-sm-2 mx-2"
              type="search"
              placeholder="Search By Name"
              aria-label="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              required
              name="search"
            />
            <button
              className="btn btn-outline-primary my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </nav>

        {/* ---------------------------------- add course Button --------------------------------------       */}

        <button className="btn btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#exampleModal"> Add Course</button>

        {/* ---------------------------------- Table for courses --------------------------------------       */}

        <table className="table table-hover mt-4 ">
          <thead>
            <tr>
              <th scope="col">S no.</th>
              <th scope="col">Course Name</th>
              <th scope="col">Course Duration</th>
              <th scope="col">Course fees</th>
              <th scope="col">Eligibility</th>
              <th scope="col">Created at</th>
              {/* <th scope="col">Action</th> */}
            </tr>
          </thead>
          <tbody style={{ fontSize: "0.9rem" }}>
            {courseList.length > 0 ? (
              courseList.map((e, i) => {
                return (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{e.course_name}</td>
                    <td>
                      {e.duration_time}{" "}
                      {e.duration_type == "y"
                        ? "year"
                        : e.duration_type == "m"
                        ? "month"
                        : e.duration_type == "d"
                        ? "Days"
                        : "Hours"}
                    </td>
                    <td>{e.fees}</td>
                    <td>10 class</td>
                    <td>{e.created_at.split("T")[0]}</td>
                    {/* <td>
                      <Link
                        style={{ textDecoration: "none", color: "" }}
                        to="/admin/courses/users"
                        className=" btn btn-outline-primary "
                      >
                        Edit
                      </Link>
                    </td> */}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={8} className="text-center">
                  {" "}
                  No Course Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <Model {...{categoryList, setCategoryList, courseList, setCourseList, Salert }} currCategory={CATEGORY} />
    </>
  );
}

export default AdminCourses;
