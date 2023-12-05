import {useEffect,useContext,useState} from 'react'

import { UserContext } from '../../../context-api/UserState';

export default function Users(props) {

  const context = useContext(UserContext);
  const {updateUser} = context;

    const {AllUsers} = props;



    
  return (
  <>
        <tbody>
  <tr>
   
    <td>{AllUsers.name}</td>
    <td>{AllUsers.email}</td>
    {/* <td>{Allusers.password}</td> */}
    {/* <td><button className="mx-1 btn btn-primary" onClick={()=>{updateUser(AllUsers._id)}}>update</button> */}
        {/* <button className="btn btn-primary">Delete</button> */}
        {/* <button className="mx-1 btn btn-primary">Show details</button></td> */}
  </tr>
 </tbody>
 </>
  )
}
