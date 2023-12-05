import React, { useState, useRef } from 'react';
import Field from "../../Item/Field";
import Select from "../../Item/Select";
import { createCategories, createCourse } from "../../../api/index";

const Model = ({categoryList, setCategoryList, courseList, setCourseList, currCategory, Salert}) => {
  
    const [formdata, setFormdata] = useState({})
  const [file, setFile] = useState({})

    const [newCategory, setNewCategory] = useState("");
    const categoryBtn = useRef()
    const courseBtn = useRef()

    const handleChange = (e) => { 
        let currEle = e.target;
        if ( currEle.name == "fees" || currEle.name == "duration_time" ) {
            currEle.value = currEle.value.replaceAll(" ", "");
            if (isNaN(currEle.value)) return;
          }
          
        setFormdata({...formdata, [e.target.name]: e.target.value})
    }

    const handleForm = async (e) => {
        e.preventDefault();
//         const formdatas = new FormData();
      

//  formdatas.append('file',file);
//    formdatas.append('course_name',formdata.course_name );
//    formdatas.append('description',formdata.description );
//    formdatas.append('duration_time ',formdata.duration_time );
//    formdatas.append('duration_type',formdata.eligibility
//  );
//    formdatas.append('fees',formdata.fees );
//    formdatas.append('category ',formdata.category );


// console.log(formdatas);

        createCourse(formdata)
        .then(({ data }) => {
            console.log(data); 
            setCourseList([...courseList, data.result]);
            setFormdata({})
            Salert.success("Course Success Added")
            courseBtn.current.click();
        })
        .catch((err) => {
          console.log(err);
          Salert.error("Something went wrong!")
        });
    }
    
    const handleCategory = async (e) => {
      e.preventDefault();
      if(newCategory && newCategory != ""){ 
        createCategories({category: newCategory})
        .then(({ data }) => {
          console.log(data);
          setCategoryList([...categoryList, data.result])
          Salert.success("Category list updated");
          categoryBtn.current.click();
          setNewCategory("");
        })
        .catch(err => {  
          Salert.error("Something went wrong!")
          console.log(err);
         }); 
      }
    }

  return (
    <> 
      {/* // MODAL */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                New Course 
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleForm}> 
            <div className="modal-body">
              {/* ---------------------/////////////////////////  modal body //////////////--------------------------*/}
                <Field label={"Course Name"} name={"course_name"} value={formdata.course_name} {...{handleChange}} id='name' />
                <div className="mb-3 w-100 row">
                  <Field label={"Duration Time"} name={"duration_time"} value={formdata.duration_time} {...{handleChange}}/> 
                  <Select label={"Duration Type"} name={"duration_type"}
                    value={formdata.duration_type} {...{handleChange}}
                    multi={[{short:"y", full: "Year"}, {short:"m", full: "Months"}, {short:"d", full: "Days"}, {short:"h", full: "Hours"}]}  
                    /> 
                </div>
                <div className="mb-3">
                  <label htmlFor="eligibility" className="form-label">
                    Eligibility
                  </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      id='eligibility'
                      name='eligibility' 
                      value={formdata.eligibility}
                      onChange={handleChange} 
                    >
                      <option >------------------</option>
                      <option value="1">10th</option>
                      <option value="2">12th</option>
                      <option value="3">graduate</option>
                    </select>
                </div>
                <div className="mb-3 row">
                  <div className="col-md-8"> 
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select
                    value={formdata.category}
                    className="form-control"
                    onChange={handleChange}
                    name={"category"}
                    id={"category"}
                    required
                    >
                    <option value={""}>------ Choose One -----</option>
                    {categoryList.length > 0 &&
                        categoryList.map((e, i) => {
                        return (
                            <option key={i} value={e._id}>
                              {e.category.toUpperCase()} COURSE
                            </option>
                        );
                    })}
                    </select>
                  </div>
                  <div className="col" style={{display: 'flex', alignItems: "flex-end", color: "#2824b3",}}>
                    <span className="fs-6 fw-lighter btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#categoryModal"> New Category </span> 
                  </div>
                </div>
                <Field label={"Course Fees"} name={"fees"} value={formdata.fees} {...{handleChange}} /> 
                <div className="form-floating">
                    <textarea className="form-control" onChange={handleChange} name='description' value={formdata.description} placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                    <label htmlFor="floatingTextarea">Course Description</label>
                </div>
               
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={courseBtn}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                New Course
              </button>
            </div>
              </form>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="categoryModal"
        tabIndex="-1"
        aria-labelledby="categoryModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add New Category
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleCategory} >
            <div className="modal-body">
                <Field label={"Category Name"} value={newCategory} handleChange={(e) => setNewCategory(e.target.value)} name={"category"} />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={categoryBtn}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                New Category
              </button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Model
