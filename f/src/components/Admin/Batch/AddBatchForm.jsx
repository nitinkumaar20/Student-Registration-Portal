import { React, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createBatch } from "../../../api";
import { useState } from "react";

export default function AddBatchForm({ Salert }) {
  const location = useLocation();
  const navigate = useNavigate();

  const { course_id } = { ...location.state };
  const [credientials, setCredientials] = useState({
    course_id: course_id || "",
    batch_name: "",
    start_date: "",
    end_date: "",
    fees: "",
  });
  const onchangeButton = (e) => {
    setCredientials({ ...credientials, [e.target.name]: e.target.value });
   
  };
  const subbmit = async (e) => {
    e.preventDefault();

    const { data } = await createBatch(credientials);

    if ((data.status==='success')) {
  
      Salert.success(data.status);
      navigate("/admin/batches");
    }
    if (!(data.status==='success')) {

      Salert.error(data.error);
   
    }
    
    // createBatch(credientials)
    //   .then((e) => {
    //     return console.log("done", e);
    //     Salert.success(e);
    //   })
    //   .catch((err) => {
    //     return console.log("fail", err);
    //   });

    // console.log(credientials);
    // console.log({ [e.target.name]: e.target.value });
  };
  return (
    <>

<div className="container p-5">
  


<form onSubmit={subbmit} >
                <div className="mb-3 d-none">
                  <label htmlFor="course_id" className="form-label ">
                    course_id
                  </label>
                  <input
                    type="text"
                    className="form-control "
                    id="course_id"
                    name="course_id"
                    aria-describedby="emailHelp"
                    onChange={onchangeButton}
                    value={course_id}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="batch_name" className="form-label">
                    Batch_name
                  </label>
                  <input
                    type="text"
                    className="form-control bg-light"
                    id="batch_name"
                    name="batch_name"
                    onChange={onchangeButton}
                  />
                </div>
                    <div className="mb-3">
                  <label htmlFor="start_date" className="form-label">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="form-control bg-light"
                    id="start_date"
                    name="start_date"
                    onChange={onchangeButton}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="end_date" className="form-label">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="form-control bg-light"
                    id="end_date"
                    name="end_date"
                    onChange={onchangeButton}
                  />
                </div>
            

                <div className="d-flex justify-content-center">

                  <button
                    type="submit"
                    className="btn btn-primary w-25"
                    
                    >
                    SUBMIT
                  </button>
                    </div>
              
              </form>
              </div>
    </>
  );
}


