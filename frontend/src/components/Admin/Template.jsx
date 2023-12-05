import { useEffect, useContext, useState } from "react";
import nielit from "../../assets/images/nielit.png";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../../context-api/UserState";
import Navbar from "../UI/Navbar";
import Sidebar from "./items/Sidebar";
import jwtDecode from "jwt-decode";

export default function AdminTemplate(props) {
  const {Salert} = props;
   const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  let navigate = useNavigate(); 
  let location = useLocation();
  const { getSetUserData, validateUser,loadUser,userdata } = useContext(UserContext);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };


const checkk_admin = async()=>{
  const tokken = localStorage.getItem('jwtToken');
  const tok = await jwtDecode(tokken);

if(tok.status!="admin"){
    await navigate('/');
    return Salert.error('Not allowed');
  }

}

  useEffect(() => {
    // if((userdata) && (userdata!=undefined) && (userdata===null) && (userdata==='')){
    //   const status = userdata.status;
      
    //  if(status!="admin"){
  
    //   navigate('/')
    //   return Salert.error('Not allowed');
    // }
    
    //  }

checkk_admin();
    (async () => {
      const result = await validateUser();
      if (!result) { 
        navigate("/login");
      } 
    })()

  }, [location])
  
  return (
    <>
      <div className={!openSidebarToggle ? "grid-container" : "sidebar_hide"}>
        <Navbar hamicon={true} OpenSidebar={OpenSidebar} />
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
          history={props.history}
        />
        <div className="main-container container">
          <Outlet />
        </div>
      </div>
    </>
  );
}
