import React, { useContext, useEffect, useState } from "react";
import Field from "../../Item/Field";
import Select from "../../Item/Select";
import {
  genderList,
  maritalList,
  religionList,
  categoryList,
  stateList,
  districtList,
} from "../../Item/List";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context-api/UserState";
import {
  initialize_StepOne,
  isBatchExist,
  userInfo,
  enrollBatch,
} from "../../../api";
import jwtDecode from "jwt-decode";

const details = {
  course_id: "",
  name: "",
  father: "",
  mother: "",
  gender: "",
  dob: "",
  marital: "",
  category: "",
  religion: "",
  mobile: "",
  whatsapp: "",
  pwd: false,
  ews: false,
};
const address1 = {
  full_address: "",
  state: "",
  city: "",
  district: "",
  pincode: "",
};
const address2 = {
  full_address: "",
  state: "",
  city: "",
  district: "",
  pincode: "",
};

export default function Personal({ Salert }) {
  
  const { getSetUserData, setSelectedCourse, selectedCourse } =
    useContext(UserContext);
  const [userData, setUserData] = useState(details);
  const [userAdrs1, setUserAdrs1] = useState(address1); // permanent addrs
  const [userAdrs2, setUserAdrs2] = useState(address2); // corespond addrs
  const [disabled, setDisabled] = useState(false);

  const [update, setUpdate] = useState(false);
  const [serverdata, setServerdata] = useState(null);

  const [trigger, setTrigger] = useState(true); // corespond addrs same
  const location = useLocation();
  const navigate = useNavigate();
  const loginData = getSetUserData();
  const { course_name, course_id } = { ...location.state };

  // for routing
  useEffect(() => {
    if (!course_id) {
      navigate("../courses");
      
    } else {
      setSelectedCourse({ course_name, course_id });
      console.log(selectedCourse);
    }
  }, []);

  // for load data
  useEffect(() => {
    (async() => {
      // const {course_id}= {...location.state};
      const tokenn = localStorage.getItem("jwtToken");
      const { user_id } = await jwtDecode(tokenn);
      // console.log(user_id);
      const {data}  = await isBatchExist({ course_id: course_id, user_id });
      console.log(data);
      
      if (data.ExUser != null) {
         Salert.info("Already Enroll the Course");
        navigate("/dashboard/courses");
      }  if (data.batchStatus != "ongoing"  ) {
        console.log(data.batchStatus,'status');
        await Salert.info(`Batch is ${data.batchStatus || "coming soon"}`);
        navigate("/dashboard/courses");
      }if(data.batchStatus =='ongoing'){}
    })();

    if (location.state && location.state.course_id) {
      userInfo({ ask: "personal" })
        .then(({ data }) => {
          const { result } = data;
          // console.log({data})
          if (result.length != 0) {
            setUserAdrs1(result[0].permanent);
            setUserAdrs2(result[0].correspond);
            setUserData({
              ...result[0].userData,
              dob: result[0].userData.dob.split("T")[0],
            });
            setServerdata({
              userAdrs1: result[0].permanent,
              userAdrs2: result[0].correspond,
              userData: {
                ...result[0].userData,
                dob: result[0].userData.dob.split("T")[0],
              },
            });
            setDisabled(true);
            // setUpdate(true);
          }
        })
        .catch((err) => {
          // console.log(err.message);
        });
    }
  }, []);

  const isFieldValid = (e) => {
    const currEle = e.target;
    if (
      currEle.value == "" ||
      currEle.validationMessage != "" ||
      currEle.value == "-----------------"
    ) {
      currEle.classList.remove("is-valid");
      currEle.classList.add("is-invalid");
      let warnBox = e.target.nextElementSibling;
      warnBox.innerHTML = e.target.validationMessage;
    } else {
      currEle.classList.remove("is-invalid");
      currEle.classList.add("is-valid");
    }
  };

  const handleChange = (e, num) => {
    const currEle = e.target;
    if (
      currEle.name == "pincode" ||
      currEle.name == "mobile" ||
      currEle.name == "whatsapp"
    ) {
      currEle.value = currEle.value.replaceAll(" ", "");
      if (isNaN(currEle.value)) {
        return;
      }

      let len = currEle.value.split("").length;
      if (currEle.name == "pincode" && len > 6) return;
      else if (
        (currEle.name == "mobile" || currEle.name == "whatsapp") &&
        len > 10
      ) {
        return;
      }
    }

    if (currEle.name == "ews" || currEle.name == "pwd") {
      console.log(currEle.value);
      setUserData({
        ...userData,
        [currEle.name]:
          currEle.value != "" && currEle.value == "YES" ? true : false,
      });
      return;
    }

    if (num == 1) {
      setUserAdrs1({ ...userAdrs1, [currEle.name]: currEle.value });
    } else if (num == 2) {
      setUserAdrs2({ ...userAdrs2, [currEle.name]: currEle.value });
    } else {
      setUserData({ ...userData, [currEle.name]: currEle.value });
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    setDisabled(true);
    Salert.info("Please check all info before next step!!");
  };

  const handleSubmit = async () => {
    let custom_params = {};
    if (serverdata != null) {
      let obj1 = { userAdrs1, userAdrs2, userData };
      let obj2 = serverdata;
      if (JSON.stringify(obj1) === JSON.stringify(obj2)) {
        Salert.success("Personal Detail Save Successfully");
        navigate("../user/step_two");
        return;
      } else {
        custom_params = {
          update: true,
          userData: {},
          permanent: {},
          correspond: {},
        };

        for (const key in userData) {
          if (userData[key] !== serverdata.userData[key])
            custom_params.userData[key] = userData[key];
        }
        for (const key in userAdrs1) {
          if (userAdrs1[key] !== serverdata.userAdrs1[key])
            custom_params.permanent[key] = userAdrs1[key];
        }
        for (const key in userAdrs2) {
          if (userAdrs2[key] !== serverdata.userAdrs2[key])
            custom_params.correspond[key] = userAdrs2[key];
        }
      }
    } else {
      custom_params = {
        userData,
        permanent: userAdrs1,
        correspond: userAdrs2,
        update: false,
      };
    }
    initialize_StepOne(custom_params)
      .then(() => {
        Salert.success("Personal Detail Save Successfully");
        navigate("../user/step_two");
      })
      .catch((err) => {
        Salert.error(err.message);
      });
  };

  const sameAdrs = (e) => {
    if (e.target.value == "true") {
      setUserAdrs2(userAdrs1);
    } else {
      setUserAdrs2(address2);
    }
    setTrigger((prev) => !prev);
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        <div className="container my-5">
          <form className="row g-3 needs-validation" onSubmit={handleForm}>
            <div className="col-md-4">
              <Field
                name={"course_name"}
                label={"Course Name"}
                value={course_name && course_name}
                required={false}
                disabled={true}
              />
            </div>

            <div className="col-md-4">
              <Field
                name={"name"}
                label={"Full Name"}
                value={userData.name}
                isValid={isFieldValid}
                handleChange={handleChange}
                disabled={disabled}
              />
            </div>

            <div className="col-md-4">
              <Field
                name={"father"}
                label={"Father Name"}
                value={userData.father}
                isValid={isFieldValid}
                handleChange={handleChange}
                disabled={disabled}
              />
            </div>

            <div className="col-md-4">
              <Field
                name={"mother"}
                label={"Mother Name"}
                value={userData.mother}
                isValid={isFieldValid}
                handleChange={handleChange}
                disabled={disabled}
              />
            </div>

            <div className="col-md-4">
              <Select
                label={"Gender"}
                name={"gender"}
                value={userData.gender}
                multi={genderList}
                isValid={isFieldValid}
                handleChange={handleChange}
                disabled={disabled}
              />
            </div>

            <div className="col-md-4">
              <Field
                name={"dob"}
                label={"Date of Birth"}
                type={"date"}
                value={userData.dob}
                isValid={isFieldValid}
                handleChange={handleChange}
                disabled={disabled}
              />
            </div>
            <div className="col-md-4">
              <Field
                name={"email"}
                label={"Email Address"}
                type={"email"}
                value={loginData.email}
                handleChange={handleChange}
                disabled={true}
              />
            </div>
            <div className="col-md-4">
              <Select
                label={"Marital Status"}
                name={"marital"}
                isValid={isFieldValid}
                value={userData.marital}
                simple={maritalList}
                handleChange={handleChange}
                disabled={disabled}
              />
            </div>
            <div className="col-md-4">
              <Select
                label={"Category"}
                name={"category"}
                isValid={isFieldValid}
                value={userData.category}
                simple={categoryList}
                handleChange={handleChange}
                disabled={disabled}
              />
            </div>
            <div className="col-md-4">
              <Select
                label={"PWD"}
                name={"pwd"}
                isValid={isFieldValid}
                value={(userData.pwd == true && "YES") || "NO"}
                simple={["YES", "NO"]}
                handleChange={handleChange}
                disabled={disabled}
              />
            </div>
            <div className="col-md-4">
              <Select
                label={"EWS"}
                name={"ews"}
                isValid={isFieldValid}
                value={(userData.ews == true && "YES") || "NO"}
                simple={["YES", "NO"]}
                handleChange={handleChange}
                disabled={disabled}
              />
            </div>
            <div className="col-md-4">
              <Select
                label={"Religion"}
                name={"religion"}
                isValid={isFieldValid}
                value={userData.religion}
                multi={religionList}
                handleChange={handleChange}
                disabled={disabled}
              />
            </div>
            <div className="col-md-4">
              <Field
                name={"mobile"}
                label={"Mobile No."}
                value={userData.mobile}
                isValid={isFieldValid}
                handleChange={handleChange}
                disabled={disabled}
              />
            </div>
            <div className="col-md-4">
              <Field
                name={"whatsapp"}
                label={"Whatsapp No."}
                isValid={isFieldValid}
                value={userData.whatsapp}
                handleChange={handleChange}
                disabled={disabled}
              />
            </div>
            <div className="row g-3">
              <Field
                name={"full_address"}
                label={"Permanent Address"}
                adrs={1}
                value={userAdrs1.full_address}
                isValid={isFieldValid}
                handleChange={handleChange}
                disabled={disabled}
              />
              <Select
                label={"State"}
                name={"state"}
                adrs={1}
                isValid={isFieldValid}
                value={userAdrs1.state}
                multi={stateList}
                handleChange={handleChange}
                disabled={disabled}
              />
              <Select
                label={"District"}
                name={"district"}
                adrs={1}
                isValid={isFieldValid}
                value={userAdrs1.district}
                simple={userAdrs1.state != "" && districtList[userAdrs1.state]}
                handleChange={handleChange}
                disabled={disabled}
              />
              <Field
                name={"city"}
                label={"City"}
                adrs={1}
                value={userAdrs1.city}
                isValid={isFieldValid}
                handleChange={handleChange}
                disabled={disabled}
              />
              <Field
                name={"pincode"}
                label={"Pincode"}
                adrs={1}
                value={userAdrs1.pincode}
                isValid={isFieldValid}
                handleChange={handleChange}
                disabled={disabled}
              />
            </div>

            <div className="row g-3">
              <div className="form-switch w-100 d-flex justify-content-end">
                <label
                  className="form-check-label mx-5"
                  htmlFor="flexSwitchCheckChecked"
                >
                  Same as Permanent Address
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  onClick={sameAdrs}
                  value={trigger}
                  role="switch"
                  id="flexSwitchCheckChecked"
                  disabled={disabled}
                />
              </div>
              <Field
                name={"full_address"}
                label={"Correspond Address"}
                adrs={2}
                value={userAdrs2.full_address}
                isValid={isFieldValid}
                handleChange={handleChange}
                disabled={disabled}
              />
              <Select
                label={"State"}
                name={"state"}
                isValid={isFieldValid}
                adrs={2}
                value={userAdrs2.state}
                multi={stateList}
                handleChange={handleChange}
                disabled={disabled}
              />
              <Select
                label={"District"}
                isValid={isFieldValid}
                adrs={2}
                name={"district"}
                value={userAdrs2.district}
                simple={userAdrs2.state != "" && districtList[userAdrs2.state]}
                handleChange={handleChange}
                disabled={disabled}
              />
              <Field
                name={"city"}
                label={"City"}
                adrs={2}
                value={userAdrs2.city}
                isValid={isFieldValid}
                handleChange={handleChange}
                disabled={disabled}
              />
              <Field
                name={"pincode"}
                label={"Pincode"}
                adrs={2}
                value={userAdrs2.pincode}
                isValid={isFieldValid}
                handleChange={handleChange}
                disabled={disabled}
              />
            </div>
            <div className="col-12 d-flex justify-content-center">
              <button
                className={`btn btn-primary m-3 ${disabled ? "" : "disabled"}`}
                onClick={() => setDisabled(false)}
                type="button"
              >
                {" "}
                Edit{" "}
              </button>
              <button
                className={`btn btn-primary m-3 ${disabled ? "disabled" : ""}`}
                type="submit"
              >
                {" "}
                Save{" "}
              </button>
              <button
                className={`btn btn-primary m-3 ${disabled ? "" : "disabled"}`}
                type="button"
                // state={{course_name: course_name}}
                onClick={handleSubmit}
              >
                {" "}
                Next{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
