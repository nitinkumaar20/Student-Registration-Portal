import {React,useEffect,useContext }from 'react'
import { UserContext } from '../../../context-api/UserState';
import { useNavigate } from "react-router-dom";


function Home({Salert}) {
  const navigate = useNavigate();
  const { userdata, loadUser, } = useContext(UserContext);


  // useEffect(() => {
  
  // if((userdata) && (userdata!=undefined)){
  //   const status = userdata.status;
  //   if(status!="admin"){

  //     navigate('/')
  //     return Salert.error('Not allowed')
  //   }
  //  }
  // }, [])
  
  return (
    <div className='container'>Welcome Admin</div>
  )
}

export default Home