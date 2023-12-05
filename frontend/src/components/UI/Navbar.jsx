import {useContext,useEffect, useState} from 'react'
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from './../../context-api/UserState'; 
import { BsJustify } from 'react-icons/bs';

export default function Navbar(props) {

  const context = useContext(UserContext)
  const { getSetUserData, validateUser, logoutUser } = context;

  let navigate= useNavigate();
  const [islogin, setIslogin] = useState(false);
  const userdata = getSetUserData();
  
  const LogoutBtn = async() => {
   logoutUser();
     await navigate("/");
    //  alert('user login')
  }
  
  useEffect(() => {
    (async () => { setIslogin(await validateUser()) })()
  }, [])
  

  return (
    <nav className=" header navbar sticky-top navbar-expand-lg bg-body-tertiary p-0 "   >
      <div className="container-fluid d-flex justify-content-between nav" >
            <div className='menu-icon'>
              <BsJustify className={`icon text-light d-${props.hamicon?'':'none'}`} style={{width:'4rem',height:'2rem' }} onClick={props.OpenSidebar}/>
            </div> 
            <div> 
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button> 
              <div className="collapse navbar-collapse mx-4" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <div className='d-flex '> 
                      <li className="nav-item  mx-2">
                        <Link className="nav-link active text-light" aria-current="page" to="/">Home</Link>
                      </li>
                      {/* <li className="nav-item mx-2">
                        <Link className="nav-link text-light" aria-current="page" to="/about">About</Link>
                      </li>  */}
                     {
                        !islogin && (
                          <>
                            <li  className="nav-item mx-2">
                              <Link className="nav-link text-light " to="/signup" >Signup</Link>
                            </li>
                            <li className="nav-item mx-2">
                              <Link className="nav-link  text-light " to="/login">Login</Link>
                            </li> 
                          </>
                        )
                      }
                      
                    </div>
                    {
                      islogin && (
                        <>
                        <li className="nav-item mx-2">
                          <Link className="nav-link text-light" aria-current="page" to="/dashboard">Dashboard</Link>
                        </li>
                          <li className="nav-item dropdown p-0 m-0">
                            <div className="nav-link dropdown-toggle active" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                              {`Hi, ${userdata.name}`}
                            </div>
                            <ul className="dropdown-menu " >
                              <li className="nav-item px-2 ">
                                <Link className="nav-link  logout" style={{padding:"0",margin:"0"}}onClick={LogoutBtn}>Logout</Link>
                              </li>
                            </ul>
                          </li>
                        </> 
                      )
                    }
                  </ul>
              </div>
            </div>
      </div>
    </nav> 
  )
}
