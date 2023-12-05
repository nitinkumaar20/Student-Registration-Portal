import {React,useEffect, useState} from "react";
import photo from "../../../assets/images/photo.jpg";
import sign from "../../../assets/images/sign.png";
import { userInfo } from "../../../api/index";

function UserProfile() {

  const [Info, setInfo] = useState({});
  const [docPath, setDocPath] = useState({})

  useEffect(() => {
    userInfo({ ask: "all" })
      .then(async ({ data }) => {
        setInfo(data.result[0].userData);
        setDocPath(data.result[2])

        console.log(data.result[0].userData);
      })
      .catch((err) => {
        return console.log(err);
      });
  }, []);
  return (
    <section className="container">
      <div className=" row d-flex  ">
        <div className=" col-md-6">
          <div className="d-flex justify-content-center">
            <figure className="mx-3">
              <img
               src={docPath.photo && `http://localhost:5000/${docPath.photo}`}
                alt="photo"
                style={{
                  width: "11rem",
                  height: "11rem",
                  borderRadius: "7rem",
                  border: "1px solid blue",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
                 
                }}
              />
            </figure>
            <figure>
              <img
                src={docPath.photo && `http://localhost:5000/${docPath.sign}`}
                alt="photo"
                style={{
                  width: "11rem",
                  height: "11rem",
                  borderRadius: "4rem",
                  border: "1px solid blue",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
                }}
              />
            </figure>
          </div>

    
        </div>

        <div className=" col-md-6">
          <table className="table table-bordered " >
            <tbody >
              <tr>
                <th scope="row" colSpan={2} className="text-center h1">
                  Candidate Details
                </th>
              </tr>
              <tr >
                <th scope="row">Candidate Name</th>
                <td >
                  <input
                    type="text "
                    style={{
                      border: "none",
                      padding: ".2rem 2rem",
                      borderRadius: ".3rem",
                    }}
                    defaultValue={Info.name}
                  />
                </td>
              </tr>

              <tr>
                <th scope="row">Father's Name</th>
                <td>
                  <input
                    type="text "
                    style={{
                      border: "none",
                      padding: ".2rem 2rem",
                      borderRadius: ".3rem",
                    }}
                    defaultValue={Info.father}

                  />
                </td>
              </tr>

              <tr>
                <th scope="row">Mother Name</th>
                <td>
                  <input
                    type="text "
                    style={{
                      border: "none",
                      padding: ".2rem 2rem",
                      borderRadius: ".3rem",
                    }}
                    defaultValue={Info.mother}

                  />
                </td>
              </tr>

              <tr>
                <th scope="row">Gender</th>
                <td>
                  <input
                    type="text "
                    style={{
                      border: "none",
                      padding: ".2rem 2rem",
                      borderRadius: ".3rem",
                    }}
                    defaultValue={Info.gender}

                  />
                </td>
              </tr>

              <tr>
                <th scope="row">Date of Birth</th>
                <td>
                  <input
                    type="text "
                    style={{
                      border: "none",
                      padding: ".2rem 2rem",
                      borderRadius: ".3rem",
                    }}
                    defaultValue={Info.dob}

                  />
                </td>
              </tr>

              <tr>
                <th scope="row">Email</th>
                <td>
                  <input
                    type="text "
                    style={{
                      border: "none",
                      padding: ".2rem 2rem",
                      borderRadius: ".3rem",
                    }}
                    defaultValue={Info.email}

                  />
                </td>
              </tr>

              <tr>
                <th scope="row">Marital Status</th>
                <td>
                  <input
                    type="text "
                    style={{
                      border: "none",
                      padding: ".2rem 2rem",
                      borderRadius: ".3rem",
                    }}
                    defaultValue={Info.marital}

                  />
                </td>
              </tr>

              <tr>
                <th scope="row">Mobile No.</th>
                <td>
                  <input
                    type="text "
                    style={{
                      border: "none",
                      padding: ".2rem 2rem",
                      borderRadius: ".3rem",
                    }}
                    defaultValue={Info.mobile}

                  />
                </td>
              </tr>

              <tr>
                <th scope="row">Watsapp No.</th>
                <td>
                  <input
                    type="text "
                    style={{
                      border: "none",
                      padding: ".2rem 2rem",
                      borderRadius: ".3rem",
                    }}
                    defaultValue={Info.whatsapp}

                  />
                </td>
              </tr>

              <tr>
                <th scope="row">Religion</th>
                <td>
                  <input
                    type="text "
                    style={{
                      border: "none",
                      padding: ".2rem 2rem",
                      borderRadius: ".3rem",
                    }}
                    defaultValue={Info.religion}

                  />
                </td>
              </tr>

              <tr>
                <th scope="row">Category</th>
                <td>
                  <input
                    type="text "
                    style={{
                      border: "none",
                      padding: ".2rem 2rem",
                      borderRadius: ".3rem",
                    }}
                    defaultValue={Info.category}

                  />
                </td>
              </tr>

              <tr>
                <th scope="row">PWD</th>
                <td>
                  <input
                    type="text "
                    style={{
                      border: "none",
                      padding: ".2rem 2rem",
                      borderRadius: ".3rem",
                    }}
                    defaultValue={Info.pwd===false?"No":"YES"}

                  />
                </td>
              </tr>

              <tr>
                <th scope="row">EWS</th>
                <td>
                  <input
                    type="text "
                    style={{
                      border: "none",
                      padding: ".2rem 2rem",
                      borderRadius: ".3rem",
                    }}
                    defaultValue={Info.ews===false?"No":"YES"}

                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* <div className="three-userPro">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th scope="row" colSpan={2} className="text-center h1">
                  High School
                </th>
              </tr>
              <tr>
                <th scope="row">Class Name</th>
                <td>
                  <input
                    type="text "
                    style={{
                      border: "none",
                      padding: ".2rem 2rem",
                      borderRadius: ".3rem",
                    }}
                  />
                </td>
              </tr>

              <tr>
                <th scope="row">Year of Passing</th>
                <td>
                  <input
                    type="text "
                    style={{
                      border: "none",
                      padding: ".2rem 2rem",
                      borderRadius: ".3rem",
                    }}
                  />
                </td>
              </tr>

              <tr>
                <th scope="row">Percentage</th>
                <td>
                  <input
                    type="text "
                    style={{
                      border: "none",
                      padding: ".2rem 2rem",
                      borderRadius: ".3rem",
                    }}
                  />
                </td>
              </tr>

              <tr>
                <th scope="row">School Name</th>
                <td>
                  <input
                    type="text "
                    style={{
                      border: "none",
                      padding: ".2rem 2rem",
                      borderRadius: ".3rem",
                    }}
                  />
                </td>
              </tr>

              <tr>
                <th scope="row">Board Name</th>
                <td>
                  <input
                    type="text "
                    style={{
                      border: "none",
                      padding: ".2rem 2rem",
                      borderRadius: ".3rem",
                    }}
                  />
                </td>
              </tr>

              <tr>
                <th scope="row">Division </th>
                <td>
                  <input
                    type="text "
                    style={{
                      border: "none",
                      padding: ".2rem 2rem",
                      borderRadius: ".3rem",
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div> */}

        {/* <div className="four-userPro">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th scope="row" colSpan={2} className="text-center h1">
                  Intermediate School
                </th>
              </tr>
              <tr>
                <th scope="row">Class Name</th>
                <td>
                  <input
                    type="text "
                    style={{
                      border: "none",
                      padding: ".2rem 2rem",
                      borderRadius: ".3rem",
                    }}
                  />
                </td>
              </tr>

              <tr>
                <th scope="row">Year of Passing</th>
                <td>
                  <input
                    type="text "
                    style={{
                      border: "none",
                      padding: ".2rem 2rem",
                      borderRadius: ".3rem",
                    }}
                  />
                </td>
              </tr>

              <tr>
                <th scope="row">Percentage</th>
                <td>
                  <input
                    type="text "
                    style={{
                      border: "none",
                      padding: ".2rem 2rem",
                      borderRadius: ".3rem",
                    }}
                  />
                </td>
              </tr>

              <tr>
                <th scope="row">School Name</th>
                <td>
                  <input
                    type="text "
                    style={{
                      border: "none",
                      padding: ".2rem 2rem",
                      borderRadius: ".3rem",
                    }}
                  />
                </td>
              </tr>

              <tr>
                <th scope="row">Board Name</th>
                <td>
                  <input
                    type="text "
                    style={{
                      border: "none",
                      padding: ".2rem 2rem",
                      borderRadius: ".3rem",
                    }}
                  />
                </td>
              </tr>

              <tr>
                <th scope="row">Division </th>
                <td>
                  <input
                    type="text "
                    style={{
                      border: "none",
                      padding: ".2rem 2rem",
                      borderRadius: ".3rem",
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div> */}
      </div>
    </section>
  );
}

export default UserProfile;
