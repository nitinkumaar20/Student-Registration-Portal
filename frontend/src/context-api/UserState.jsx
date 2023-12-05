import { createContext, useState } from "react";
import jwtDecode from "jwt-decode"; 
import { axios } from './../api/index';

const UserContext = createContext();

export default function UserState(props) {
  const [userdata, setUserdata] = useState({});
  const [loader, setLoader] = useState(false) 
  const [selectedCourse, setSelectedCourse] = useState(null) 
  
  const loadUser = async (token=undefined) => {
    if (token) {
      localStorage.setItem("jwtToken", token);
    }
    else{
      token = localStorage.getItem('jwtToken');
    }
    if (!token) {
      return
    }
    axios.defaults.headers = {jwtToken: token} 
    const user = jwtDecode(token); 
    getSetUserData({name: user.name, email: user.email, status: user.status}); 
  }
  
  const validateUser = async () => {  
    try { 
      let token = localStorage.getItem('jwtToken') || undefined; 
      if (!token) {
        throw Error("Token Not Found")
      }
      const { exp } = jwtDecode(token);
      if (exp < (Math.round(Date.now()/1000)) ) {
        localStorage.removeItem('jwtToken')
        throw Error("Token Expire")
      }
      return true;
    } catch (err) {
      console.log(err.message);
      return false;
    } 
  };

  const logoutUser = () => { 
    localStorage.removeItem('jwtToken');
    axios.defaults.headers = {jwtToken: ''};
    setUserdata({}); 
  }
 
  const getSetUserData = (data) => {
    if (data) {
      setUserdata(data);
    }
    return userdata;
  }
 
  return (
    <UserContext.Provider
      value={{
        validateUser, userdata, setUserdata, getSetUserData,
        loader, setLoader, loadUser,
        selectedCourse, setSelectedCourse, logoutUser
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export { UserContext };



// const personalData = {
//   userData: {name: 'Harsh Saini', father: 'Naresh Saini', mother: 'Pushpa Saini', gender: 'M', dob: '2003-08-13', marital: 'SINGLE', category: 'OBC', pwd: 'NO', ews: 'NO', religion: 'Hinduism', mobile: '8433480253', whatsapp: '8433480253' },
//   userAdrs1: {full_address: 'Mohammadpur Kunhari', state: 'UK', city: 'Haridwar', district: 'Haridwar', pincode: '247663'},
//   userAdrs2: {full_address: 'Mohammadpur Kunhari', state: 'UK', city: 'Haridwar', district: 'Haridwar', pincode: '247663'}
// }