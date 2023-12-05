import { useEffect, React, useState } from "react";
import { ShowAllBatches } from "../../../api";
import { Link, useNavigate,useLocation } from "react-router-dom";

export default function ShowBatches() {
  const [Batch, setBatch] = useState([]);
  const [Status, setStatus] = useState("");

const location = useLocation();


  useEffect(() => {
    (async () => {
    console.log('status');
        const { data } = await ShowAllBatches({ ask: Status });
        setBatch(data.result);
        console.log(data);
      
    })();
  }, [Status]);

  return (
    <section className="container">
      {/* // add batch button and search button */}

      <nav className=" my-4">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <select
              className="form-select"
              aria-label="Default select example"
              value={Status}
              onChange={(e) => {
                return setStatus(e.target.value);
              }}
            >
              <option value={""}>------Batch Status-----</option>

              <option value="ongoing">Ongoing</option>
              <option value="upcoming">Upcoming</option>
              <option value="ended">Ended</option>
              <option value="cancel">Cancel</option>
            </select>
          </div>

          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search by Name"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>

      {/* -------------------/////////////  table   //////////--------- */}

      <table className="table table-hover  " style={{ margin: "" }}>
        <thead>
          <tr>
            <th>S no.</th>
            <th>Batch Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Fees</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody style={{ fontSize: "0.9rem" }}>
          {Batch.length > 0 ? (
            Batch.map((e, i) => {
              return (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{e.batch_name}</td>
                  <td>{e.start_date.split("T")[0]}</td>
                  <td>{e.end_date.split("T")[0]}</td>
                  <td>{e.fees}</td>
                  <td>{e.status}</td>
                  <td>
                    {/* <button className="btn btn-outline-primary ">Edit</button> */}
                    <Link className="btn btn-outline-primary mx-2" to="./candidates" state={{userlist:e.user_list}}>
                      Candidates
                    </Link>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={7} className="text-center">
                {" "}
                No Course Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
