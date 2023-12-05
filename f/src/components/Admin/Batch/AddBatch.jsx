import React, { useContext, useEffect, useState } from "react"; 
import { UserContext } from "../../../context-api/UserState";
import { Link,useLocation } from "react-router-dom";
import { getCourses, getCategories } from "../../../api/index";

export default function AddBatch({Salert}) {
  const [CATEGORY, setCATEGORY] = useState('') 
  
  const [categoryList, setCategoryList] = useState([])
  const [courseList, setCourseList] = useState([])
  const location = useLocation();
  
  useEffect(() => { 
    (async () => {
      const { data } = await getCategories(); 
      setCategoryList(data.result)
    })()
  }, [])
  

  useEffect(() => { 
    if (CATEGORY != '') {
      (async () => {
        const { data } = await getCourses({category: CATEGORY}); 
        setCourseList(data.result)
      })()
    }
  }, [CATEGORY])

  const GetCourse = () => {
    return ( 
      <div className="container mt-4">
        <div className="row">
          {
            (courseList.length > 0) ? courseList.map((e, i) => {
              return (
                <div className="col-md-4" key={i}>
                  <div className="card">
                    {/* <img src="" className="card-img-top" alt=""/> */}
                    <div className="card-body">
                      <h5 className="card-title">{e.course_name}</h5>
                      <p className="card-text">{e.description ? e.description : "Some quick example text to build on the card title and make up the bulk of the card's content."}</p>
                      <Link to='./create' className="btn btn-danger"  state={{course_id: e._id, course_name: e.course_name}}>Apply Now</Link>

    
                    </div>
                  </div>
                </div>
              )
            }) : (
              <div className="col-md-12 text-center">
                {(CATEGORY == '') ? 'Please Select Batch category' : 'No Course Available in this Category'} 
              </div>
            )
          } 
        </div>
      </div> 
    )
  }

  return (
    <div className="m-5">
   
       <div className="form-inline d-flex justify-content-center align-items-center" >
        <div className="mx-2" >
        <p style={{marginBottom:'0',color:'black'}} className="mandatory">SELECT BATCH CATEGORY</p> 
   


        </div>
        <div className="mx-2" >
        <select className="form-control" onChange={(e) => {setCATEGORY(e.target.value)
}}
>
          <option value={''}>------ Choose One -----</option>
          {
            categoryList.length > 0 && categoryList.map((e, i) => {
              return (
                <option key={i} value={e._id} >{e.category.toUpperCase()} COURSE</option>
              )
            })
          }
        </select>
        </div> 
      </div>

      <GetCourse />
 




    </div>
  )
}

