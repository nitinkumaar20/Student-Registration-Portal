import React, { useContext, useEffect, useState } from "react"; 
import { UserContext } from "../../../context-api/UserState";
import { Link } from "react-router-dom";
import { getCourses, getCategories, isBatchExist } from "../../../api";
import nielitcard from '../../../assets/images/nielitcard.webp'

const Courses = ({home}) => {
  const [CATEGORY, setCATEGORY] = useState('') 

  const [categoryList, setCategoryList] = useState([])
  const [courseList, setCourseList] = useState([])

  useEffect(() => { 
    (async () => {
      const { data } = await getCategories(); 
      setCategoryList(data.result)
    })()
  }, [])
  

  useEffect(() => { 
    // if (CATEGORY != '') {
      (async () => {
        const { data } = await getCourses({category: CATEGORY}); 
        setCourseList(data.result)
      })()
    // }
  }, [CATEGORY])
  

  const GetCourse = () => {
    return ( 
      <article className="container mt-4 ">
        <div className="row">
          {
            (courseList.length > 0) ? courseList.map((e, i) => {
              return (
                <div className="col-md-3 post-item mx-2 p-0" key={i}>
                 
                <div className="card-img">
        {/* <img loading="lazy" src="https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bc01c83c3da0425e9baa6c7a9204af81" alt="amazing caves coverimage" className="img-fluid"/> */}
        <img loading="lazy" src={nielitcard} alt="amazing caves coverimage" className="img-fluid"/>

   </div>
                    <div className="content">
                      <h5 className="card-title">{e.course_name}</h5>
                      <p className="card-text">{e.description ? e.description : "Some quick example text to build on the card title and make up the bulk of the card's content."}</p>
                      <Link to="/dashboard/user/step_one"  className="btn btn-main"  state={{course_id: e._id, course_name: e.course_name}} >Apply Now</Link>
                    </div>
                
                </div>
              )
            }) : (
              <div className="col-md-12 text-center">
                {(CATEGORY == '') ? 'SELECT COURSES CATEGORY' : 'No Course Available in this Category'} 
              </div>
            )
          } 
        </div>
      </article> 


    )
  }

  return (
    <div className={`${home?'courses-card':'container'} `}>  

	{home?	<div className="row justify-content-center p-0">
			{/* <!-- section title --> */}
			<div className="col-lg-8 mx-2 ">
				<div className="title text-center ">
					<h2>All Courses</h2>
					<div className="border"></div>
					<p>NIELIT Haridwar centre is offering various Internship / Training courses, to make engineering graduates adequately equipped with required skills.</p>
				</div>
			</div>
      </div>
      :<div></div>}
		
	
       <div className={`form-inline d-flex justify-content-${home?'center':'end'} align-items-center`} >
       
        <div className="mx-2 mb-4 " >
      

        {
categoryList.length > 0 && categoryList.map((e,i)=>{
return(
<button className="btn btn-primary p-3 mx-2" key ={i} value ={e._id} onClick={(e)=>{return(setCATEGORY(e.target.value))}}>{e.category.toUpperCase()} COURSE</button>
)
})

        }
        </div> 
      </div>

      <GetCourse />
    </div>
  );
};

export default Courses;
