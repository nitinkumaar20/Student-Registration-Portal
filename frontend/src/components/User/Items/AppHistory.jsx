import React, { useEffect ,useState} from 'react'
import {App_History} from '../../../api/index'
function AppHistory() {
const [courses, setCourses] = useState([]);

    useEffect(() => {
      (async()=>{   
      const {data} = await App_History() 
      const data2 = await App_History() 
    console.log(data2);
setCourses(data)
    })()
 
  

    }, [])
    
  return (
    <div>
        <table className="table table-hover">
  <thead>
    <tr>
 
      <th scope="col">S.no</th>
      <th scope="col">Course</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
  
  
<tbody>
  
{
  courses.map((e,index)=>{
  return (

    <tr key={e._id}>
    <td>{index+1}</td>
    <td>{e.course_name}</td>
    <td>{e.amount}</td>
  </tr>
  
 
    )
})
} 
  </tbody>
 
</table>
    </div>
  )
}

export default AppHistory