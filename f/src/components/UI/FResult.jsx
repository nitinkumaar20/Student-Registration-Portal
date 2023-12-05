import { React, useEffect, useState, useContext, useRef } from "react";
import nielit from "../../assets/images/nielit.png";
import { userInfo } from "../../api";
import { UserContext } from "../../context-api/UserState";
import { useReactToPrint } from "react-to-print";
import { Link ,useLocation} from "react-router-dom"; 
// import { UserContext } from '../../context-api/UserState';


function FResult() {
  // const { getSetUserData, selectedCourse } = useContext(UserContext)

  const location = useLocation();
  const { order_id,course_name,trans_id} = {...location.state}
  const { getSetUserData,selectedCourse } = useContext(UserContext);
  const printRef = useRef();
  const printBtn = useReactToPrint({ content: () => printRef.current });
  const [Info, setInfo] = useState({});
  const [Correspond, setCorrespond] = useState({});
  const [Permanent, setPermanent] = useState({});
  const [Qualification, setQualification] = useState({});
  const [docPath, setDocPath] = useState({})
  const userdata = getSetUserData();



  useEffect(() => {
    console.log(location.state,'sat');
    // console.log(selectedCourse,'course');
    userInfo({ ask: "all" })
      .then(async ({ data }) => {
        setInfo(data.result[0].userData);
        setCorrespond(data.result[0].correspond);
        setPermanent(data.result[0].permanent);
        setQualification(data.result[1]);
        setDocPath(data.result[2])
        console.log(data,'data');
        console.log(docPath,'docpath');
      })
      .catch((err) => {
        return console.log(err);
      });
  }, []);

  return (
    <>
  <div style={{display:'flex',flexDirection:'row-reverse'}}>


        <Link className="btn btn-secondary mx-2  my-2" to="/dashboard">Go to Dashboard </Link>
        <div className="btn btn-info my-2" onClick={printBtn}>
          Print & Save
        </div>
  </div>

      <div className="section-main m-4" ref={printRef}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <p>Course Registration form</p>
        </div>

        <table className="table table-bordered">
          <tbody>
            <tr className="images">
              <td>
                <img src={nielit} alt="nielit" />
              </td>
            </tr>
          </tbody>
        </table>

        <table className="table table-bordered">
          <thead>
            <tr>
              {/* <th scope="col">Application No</th> */}
              <th scope="col">Course </th>
              <th scope="col">batch name</th>
              <th scope="col">Center</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* <td>CRRN15985</td> */}
              <td>{selectedCourse.course_name}</td>
              <td>{selectedCourse.course_name + "-Batch"}</td>
              <td>NHW</td>
            </tr>
          </tbody>
        </table>

        <table className="table table-bordered  ">
          <tbody>
            <tr>
              <td colSpan={5}>Application Fee Details</td>
            </tr>
            <tr>
              <th scope="col">Order ID</th>
              <th scope="col">Transaction ID </th>
              <th scope="col">Mode of Payment</th>
              <th scope="col">Amount</th>
              <th scope="col">Date</th>
            </tr>
            <tr>
              <td>{order_id}</td>
              <td>{trans_id}</td>
              <td>online</td>
              <td>5000</td>
              <td>{Date.now()}</td>
            </tr>
          </tbody>
        </table>

        <table className="table table-bordered  ">
          <tbody>
            <tr>
              <th scope="row" colSpan={6}>
                Candidate Details
              </th>
            </tr>

            <tr>
              <th scope="row">Name</th>
              <td>{Info.name}</td>
              <td rowSpan={6} colSpan={4}>
                {/* ----------------- here the image of user ---------------------------- */}
                <img src={docPath.photo && `http://localhost:5000/${docPath.photo}`} alt="user" />
              </td>
            </tr>

            <tr>
              <th scope="row">Father's Name</th>
              <td>{Info.father}</td>
            </tr>

            <tr>
              <th scope="row">Mother Name</th>
              <td>{Info.mother}</td>
            </tr>

            <tr>
              <th scope="row">Gender</th>
              <td>{Info.gender}</td>
            </tr>

            <tr>
              <th scope="row">Date of Birth</th>
              <td>{Info.dob}</td>
            </tr>

            <tr>
              <th scope="row">Email</th>
              <td>{userdata.email}</td>
            </tr>

            <tr>
              <th scope="row">Marital Status</th>
              <td>{Info.marital}</td>
            </tr>

            <tr>
              <th scope="row">Mobile No.</th>
              <td>{Info.mobile}</td>
            </tr>

            <tr>
              <th scope="row">Watsapp No.</th>
              <td>{Info.watsapp}</td>
            </tr>

            <tr>
              <th scope="row">Religion</th>
              <td>{Info.religion}</td>
            </tr>

            <tr>
              <th scope="row">Category</th>
              <td>{Info.category}</td>
            </tr>

            <tr>
              <th scope="row">PWD</th>
              <td>{Info.pwd ? "YES" : "NO"}</td>
            </tr>

            <tr>
              <th scope="row">EWS</th>
              <td>{Info.ews ? "YES" : "NO"}</td>
            </tr>

            <tr colSpan={4} rowSpan={6}>
              <th scope="row">Permanent</th>
              <td>{Permanent.full_address}</td>
              <td>{Permanent.city}</td>
              <td>{Permanent.pincode}</td>
              <td>{Permanent.district}</td>
              <td>{Permanent.state}</td>
            </tr>

            <tr colSpan={4} rowSpan={6}>
              <th scope="row">Correspond</th>
              <td>{Permanent.full_address}</td>
              <td>{Correspond.city}</td>
              <td>{Correspond.pincode}</td>
              <td>{Correspond.district}</td>
              <td>{Correspond.state}</td>
            </tr>
          </tbody>
        </table>

        <table className="table table-bordered  ">
          <tbody>
            <tr>
              <th colSpan={6}>Educational Qualification</th>
            </tr>
            <tr>
              <th scope="col">Examination </th>

              <th scope="col">School Name</th>
              <th scope="col">Board</th>
              <th scope="col">Year of Passing </th>
              <th scope="col">Percentage</th>
              <th scope="col">Division</th>
            </tr>

            <tr>
              <th>{Qualification.exam_name} </th>
              <td>{Qualification.institute}</td>
              <td>-</td>
              <td>{Qualification.passing_year}</td>
              <td>{Qualification.percentage}</td>
              <td>{Qualification.division}</td>
            </tr>

            <tr>
              <th>- </th>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>

        <table className="table table-bordered  ">
          <tbody>
            <tr>
              <th scope="col" colSpan={6}>
                Graduation Details
              </th>
            </tr>
            <tr>
              <th scope="col"> Degree Name</th>
              <th scope="col">University/Institution</th>
              <th scope="col">Percentage/Grade </th>
              <th scope="col">Year of passing</th>
              <th scope="col">State/Union Territor</th>
              <th scope="col">Country</th>
            </tr>

            <tr>
              <th>-</th>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>

        <div className="">
          <h4>Declaration</h4>
          <p>
            I declare that the statements made in this Application Form are
            correct and true and also complete to the best of my knowledge and
            belief. I am aware that if at any stage it is found that the
            statements made are not true or are incomplete/misleading, my
            candidature is liable to be cancelled
          </p>

          <img src={docPath?.sign && `http://localhost:5000${docPath.sign}`} />
        </div>
        
      </div>
    </>
  );
}

export default FResult;
