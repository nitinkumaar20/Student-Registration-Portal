import React, { useContext, useEffect, useState } from "react";
import Field from "../../Item/Field";
import Select from "../../Item/Select";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context-api/UserState";
import { initialize_StepTwo } from "../../../api";

export default function Qualification() {
  // const { formTwo, setFormTwo } = useContext(UserContext)
  // const dummy = {
  //   other: {}, 
  //   tenth: { exam_name: 10, passing_year: 2017, percentage: 72, institute: 'RPS', university: 'UK', division: 'First', exam_type: 10}, 
  //   twelfth: {exam_name: 12, passing_year: 2019, percentage: 70, institute: 'SRIC', university: 'UK', division: 'First', exam_type: 12}, 
  //   graduation: {}, postGraduation: {}, highest: ''
  // }
  const dummy = {
    other: {}, 
    tenth: { exam_name: 10, passing_year: 2017, percentage: 72, institute: 'RPS', university: 'UK', division: 'First', exam_type: 10}, 
    twelfth: {exam_name: 12, passing_year: 2019, percentage: 70, institute: 'SRIC', university: 'UK', division: 'First', exam_type: 12}, 
    graduation: {}, postGraduation: {}, highest: ''
  }
  const [examData, setExamData] = useState(dummy) 
  const navigate = useNavigate()
  const location = useLocation()
  
  const isValid = (e) => { 
    const currEle = e.target; 
    if (currEle.value == '' || currEle.validationMessage != '' || currEle.value == "-----------------"){ 
      currEle.classList.remove('is-valid');
      currEle.classList.add('is-invalid');
      let warnBox = currEle.nextElementSibling; 
      warnBox.innerHTML = currEle.validationMessage;
    }
    else{
      currEle.classList.remove('is-invalid');
      currEle.classList.add('is-valid');
    } 
  } 

  const handleChange = (e, num) => { 
    const currEle = e.target;  
    if(currEle.name == 'pincode' || currEle.name == 'mobile' || currEle.name == 'whatsapp'){
      currEle.value = (currEle.value.replaceAll(' ', ''));
      if(isNaN(currEle.value)) 
        return;
      
      let len = currEle.value.split('').length;
      if (currEle.name == 'pincode' && len > 6)
        return;
      else if ((currEle.name == 'mobile' || currEle.name == 'whatsapp') && len > 10)
        return; 
    }
    // { 1: other, 2: 10th, 3: 12th, 4: graduation, 5: postGraduation } for handle data in same onChange Function
    switch (num) {
      case 1:
        setExamData({...examData, other: {...examData.other, [e.target.name]: e.target.value}}) 
        break;
      case 2:
        setExamData({...examData, tenth: {...examData.tenth, [e.target.name]: e.target.value}}) 
        break;
      case 3:
        setExamData({...examData, twelfth: {...examData.twelfth, [e.target.name]: e.target.value}}) 
        break;
      case 4:
        setExamData({...examData, graduation: {...examData.graduation, [e.target.name]: e.target.value}}) 
        break;
      case 5:
        setExamData({...examData, postGraduation: {...examData.postGraduation, [e.target.name]: e.target.value}}) 
        break; 
      default:
        setExamData({...examData, highest: e.target.value})
        break; 

    } 
  } 

  const handleSubmit = async (e) => {
    e.preventDefault();
    await initialize_StepTwo({ tenth: examData.tenth, twelfth: examData.twelfth })
      .then((res) => {
        // setFormTwo({tenth: examData.tenth, twelfth: examData.twelfth})
        navigate('../user/step_three') 
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      })
  }
 
  
  const educ_list = [ 
    'Other', '10th', '12th', 'Graduation', 'Post Graduation'
  ]

  const division_list = [ 
    'First',
    'Second',
    'Third'
  ]

  const objHtml = (clas) => {
    return (
    `<div className="col-lg-12 p-4 my-3" style={{border: '1px solid #e7e7e7', borderRadius: 5}}>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h5 className="panel-title text-center">High School*</h5>
        </div>
        <div className="panel-body">
          <div className="row g-5 mt-1"> 
            <Field label={'Class Name'} adrs={2} disabled={true} value={examData.tenth.exam_name} name={'exam_name'} {...{handleChange, isValid}} />  
            <Field label={'Year of Passing'} min={1950} max={2023} adrs={2} type={'number'} value={examData.tenth.passing_year} name={'passing_year'} {...{handleChange, isValid}} />
            <Field label={'Percentage'} adrs={2} min={1} max={100} step={0.01} type={'number'} value={examData.tenth.percentage} name={'percentage'} {...{handleChange, isValid}} />
          </div> 
          <div className="row g-5 mt-1"> 
            <Field label={'School Name'} adrs={2} value={examData.tenth.institute} name={'institute'} {...{handleChange, isValid}} />  
            <Field label={'Board Name'} adrs={2} value={examData.tenth.university} name={'university'} {...{handleChange, isValid}} />
            <Select label={'Division'} adrs={2} simple={division_list} value={examData.tenth.division} name={'division'} {...{handleChange, isValid}} />
          </div> 
        </div>
      </div>
    </div>`)
  }
  const avail_list = []
  const [highest, setHighest] = useState()

  
  
  return (
    <>
      <div className="container my-5" style={{border: '20px solid #e7e7e7', borderRadius: 5}}>
        <div className="row p-4" style={{border: '1px solid #0d6efd', borderRadius: 2}}>
          <form id="form" onSubmit={handleSubmit}>


            {/* Tenth  */}
            <div className="col-lg-12 p-4 my-3" style={{border: '1px solid #e7e7e7', borderRadius: 5}}>
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h5 className="panel-title text-center">High School*</h5>
                </div>
                <div className="panel-body">
                  <div className="row g-5 mt-1"> 
                    <Field label={'Class Name'} adrs={2} disabled={true} value={examData.tenth.exam_name} name={'exam_name'} {...{handleChange, isValid}} />  
                    <Field label={'Year of Passing'} min={1950} max={2023} adrs={2} type={'number'} value={examData.tenth.passing_year} name={'passing_year'} {...{handleChange, isValid}} />
                    <Field label={'Percentage'} adrs={2} min={1} max={100} step={0.01} type={'number'} value={examData.tenth.percentage} name={'percentage'} {...{handleChange, isValid}} />
                  </div> 
                  <div className="row g-5 mt-1"> 
                    <Field label={'School Name'} adrs={2} value={examData.tenth.institute} name={'institute'} {...{handleChange, isValid}} />  
                    <Field label={'Board Name'} adrs={2} value={examData.tenth.university} name={'university'} {...{handleChange, isValid}} />
                    <Select label={'Division'} adrs={2} simple={division_list} value={examData.tenth.division} name={'division'} {...{handleChange, isValid}} />
                  </div> 
                </div>
              </div>
            </div>

            {/* twelfth */}
            <div className="col-lg-12 p-4 my-3" style={{border: '1px solid #e7e7e7', borderRadius: 5}}>
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h5 className="panel-title text-center">Intermediate School*</h5>
                </div>
                <div className="panel-body">
                  <div className="row g-5 mt-1"> 
                    <Field label={'Class Name'} adrs={3} disabled={true} value={examData.twelfth.exam_name} name={'exam_name'} {...{handleChange, isValid}} />  
                    <Field label={'Year of Passing'} min={1950} max={2023} type={'number'} adrs={3} value={examData.twelfth.passing_year} name={'passing_year'} {...{handleChange, isValid}} />
                    <Field label={'Percentage'} adrs={3} min={1} max={100} type={'number'} step={0.01} value={examData.twelfth.percentage} name={'percentage'} {...{handleChange, isValid}} />
                  </div> 
                  <div className="row g-5 mt-1"> 
                    <Field label={'School Name'} adrs={3} value={examData.twelfth.institute} name={'institute'} {...{handleChange, isValid}} />  
                    <Field label={'Board Name'} adrs={3} value={examData.twelfth.university} name={'university'} {...{handleChange, isValid}} />
                    <Select label={'Division'} adrs={3} simple={division_list} value={examData.twelfth.division} name={'division'} {...{handleChange, isValid}} />
                  </div> 
                </div>
              </div>
            </div>

            {/* graduation */}
            {/* <div className="col-lg-12 p-4 my-3" style={{border: '1px solid #e7e7e7', borderRadius: 5}}>
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h5 className="panel-title text-center">Graduation Level*</h5>
                </div>
                <div className="panel-body">
                  <div className="row g-5 mt-1"> 
                    <Field label={'Degree Name'} adrs={4} value={examData.graduation.exam_name} name={'exam_name'} {...{handleChange, isValid}} />  
                    <Field label={'Year of Passing'} adrs={4} value={examData.graduation.passing_year} name={'passing_year'} {...{handleChange, isValid}} />
                    <Field label={'Percentage'} adrs={4} value={examData.graduation.percentage} name={'percentage'} {...{handleChange, isValid}} />
                  </div> 
                  <div className="row g-5 mt-1"> 
                    <Field label={'Institute'} adrs={4} value={examData.graduation.institute} name={'institute'} {...{handleChange, isValid}} />  
                    <Field label={'University'} adrs={4} value={examData.graduation.university} name={'university'} {...{handleChange, isValid}} />
                    <Select label={'Division'} adrs={1} simple={division_list} value={examData.other.division} name={'division'} {...{handleChange, isValid}} />
                  </div> 
                </div>
              </div>
            </div> */}

            {/* post graduation */}
            {/* <div className="col-lg-12 p-4 my-3" style={{border: '1px solid #e7e7e7', borderRadius: 5}}>
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h5 className="panel-title text-center">Post Graduation Level*</h5>
                </div>
                <div className="panel-body">
                  <div className="row g-5 mt-1"> 
                    <Field label={'Degree Name'} adrs={5} value={examData.postGraduation.exam_name} name={'exam_name'} {...{handleChange, isValid}} />  
                    <Field label={'Year of Passing'} adrs={5} value={examData.postGraduation.passing_year} name={'passing_year'} {...{handleChange, isValid}} />
                    <Field label={'Percentage'} adrs={5} value={examData.postGraduation.percentage} name={'percentage'} {...{handleChange, isValid}} />
                  </div> 
                  <div className="row g-5 mt-1"> 
                    <Field label={'Institute'} adrs={5} value={examData.postGraduation.institute} name={'institute'} {...{handleChange, isValid}} />  
                    <Field label={'University'} adrs={5} value={examData.postGraduation.university} name={'university'} {...{handleChange, isValid}} />
                    <Select label={'Division'} adrs={1} simple={division_list} value={examData.other.division} name={'division'} {...{handleChange, isValid}} />
                  </div> 
                </div>
              </div>
            </div> */}
            
            <div className="col-12 d-flex justify-content-center">
              <button className="btn btn-primary" type="submit">
                Submit form
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
