import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import loginImg from "./../../assets/images/srp2.png";
import nielitLogo from "./../../assets/images/nielit.png";
import { Link } from "react-router-dom"; 
import { UserContext } from './../../context-api/UserState';
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate, 
  validateCaptcha,
} from "react-simple-captcha"; 
import { loginUser } from "../../api";
import jwtDecode from "jwt-decode";

function Login({ Salert }) {
  
  const [credientials, setCredientials] = useState({ email:"", password: "" });
  const [CaptchaValue, setCaptchaValue] = useState("");
  const navigate = useNavigate();
  const { validateUser, loadUser } = useContext(UserContext);

  const onchangeButton = (e) => {
    if (e.target.name == "user_captcha_input") {
      setCaptchaValue(e.target.value);
    } else {
      setCredientials({ ...credientials, [e.target.name]: e.target.value });
    }
  };

  const submitButton = async (e) => {
    e.preventDefault(); 
    if ((validateCaptcha(CaptchaValue) === true)) {
      loadCaptchaEnginge(6);
      setCaptchaValue(""); 
      loginUser({ email: credientials.email, password: credientials.password })
        .then(async ({data}) => {
          loadUser(data.jwtToken);
          console.log(data.jwtToken);
          const { status } = await jwtDecode(data.jwtToken);

          if(status==="admin"){
            return navigate('/admin')
          }
          Salert.success('SignIn Successfull') 
          navigate("/dashboard");
          
        })
        .catch(({ response={} }) => {
          const { status, data } = response;
          if (status === 404)
            Salert.error(data.error);
          else if (status === 400) 
            Salert.error(data.error);
          else 
            Salert.error('Internal Server Error');
        }) 
    } else {
      Salert.error('Captcha Does Not Match') 
      setCaptchaValue("");
    }
  };

  useEffect(() => {
    const jwtVerify = async () => {
      const result = await validateUser()
      if (result == true) {
        navigate('/dashboard')
      }  
    }
    jwtVerify()
    loadCaptchaEnginge(6);
  }, []);

  return (
    <section>
      <div className="signup-login-div">
        <div
          className="images-div d-flex flex-column justify-content-center align-items-center"
          style={{ width: "50vw" }}
        >
          <figure>
            <img src={nielitLogo} alt="nielitLogo" className="nielitLogo" />
          </figure>
          <h2>National Institute of Electronics</h2>

          <h4>& Information Technology, Haridwar</h4>
          <figure className="d-flex flex-column justify-content-center align-items-center ">
            <img className="w-75" src={loginImg} alt="LoginImg" />
          </figure>
        </div>
        <form onSubmit={submitButton} style={{ width: "50vw" }}>
          <div className="d-flex flex-column justify-content-center align-items-center mb-4">
            <h5 className="py-2 w-100">
              Welcome to student registration portal
            </h5>
            <h3>Student Login</h3>
          </div>

          <div className="mb-3 w-100" style={{ width: "50vw" }}>
            <label htmlFor="email" className="form-label">
              Email{" "}
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              required
              minLength={5}
              aria-describedby="emailHelp"
              onChange={onchangeButton}
              value={credientials.email}
            />
          </div>
          <div className="mb-3 w-100">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="exampleInputPassword1"
              required
              minLength={5}
              onChange={onchangeButton}
              value={credientials.password}
            />
          </div>

          {/* ////////////////////////// captcha code here ///////////////////////////////////////// */}

          <div className="container">
            <div className="form-group">
              <div className="col mt-3">
                <LoadCanvasTemplate />
              </div>

              <div className="col mt-3">
                <div>
                  <input
                    placeholder="Enter Captcha Value"
                    onChange={onchangeButton}
                    id="user_captcha_input"
                    name="user_captcha_input"
                    type="text"
                  ></input>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center ">
            <button type="submit" className="btn btn-primary mb-2">
              Submit
            </button>
          </div>
          <p className="d-flex flex-column justify-content-center align-items-center">
            {/* <span className="">New user</span> */}
            <span> New user  <Link to="/signup" style={{textDecoration:'none',fontWeight:'600'}}>Create an   Account ! </Link></span>
            
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;
