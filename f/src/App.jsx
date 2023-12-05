import "./style/App.css";

import { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./context-api/UserState";

//UI folder
import Home from "./components/UI/Home";
import Success from "./components/UI/Success";
import Payment from "./components/UI/Payment";
import About from "./components/UI/About";

// Auth Folder
import Login from "./components/Auth/Login";
import SingnUp from "./components/Auth/SingnUp";

// Admin Folder
import AdminTemplate from "./components/Admin/Template";
import AdminHome from "./components/Admin/component/Home";
import AdminCourses from "./components/Admin/Courses/Courses"; 
// import Users from './components/Admin/Courses/Users';
import BatchMain from "./components/Admin/Batch/BatchMain";
import ShowBatches from "./components/Admin/Batch/ShowBatches";
import AddBatch from "./components/Admin/Batch/AddBatch";
import AddBatchForm from "./components/Admin/Batch/AddBatchForm";

// User Folder 
import Template from "./components/User/Template";
  //  Form
    import Documents from "./components/User/Forms/Documents";
    import Personal from "./components/User/Forms/Personal";
    import Qualification from "./components/User/Forms/Qualification";
  // Course
    import Courses from "./components/User/Courses/Courses";
  // component
    import Dashboard from "./components/User/component/Dashboard"; 
    import UserProfile from "./components/User/profile/UserProfile"; 

//other
  import Swal from 'sweetalert2'; 
import FResult from "./components/UI/FResult";
import AppHistory from "./components/User/Items/AppHistory";
import ShowCandidates from "./components/Admin/Batch/ShowCandidates";



function App() {
  const { loadUser } = useContext(UserContext)
  
  class ShowAlert {

    error = (message) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
      })
    }

    success = (message) => {
      Swal.fire({
        icon:'success',
        title: "Success",
        showConfirmButton: false,
        timer: 1500,
        text: message
      })
    }

    info = (message) => {
      Swal.fire({
        icon: 'info',
        title: 'Information!!',
        text: message,
      })
    }
  }
  const Salert = new ShowAlert;
 
  useEffect(() => {
    loadUser()
  }, [])
 
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/online-payment" element={<Payment Salert={Salert}/>} />
          <Route exact path="/online-payment-success" element={<Success Salert={Salert} />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/Fresult" element={<FResult/>} />
          
          <Route exact path="/admin" element={<AdminTemplate Salert={Salert}/>} > 
            <Route exact path="/admin" element={<AdminHome Salert={Salert}/>} /> 
            <Route exact path="/admin/courses" element={<AdminCourses Salert={Salert} />} />
            <Route exact path="/admin/batches" element={<BatchMain Salert={Salert} />} />
            <Route exact path="/admin/batches/showbatches" element={<ShowBatches Salert={Salert} />} />
            <Route exact path="/admin/batches/showbatches/candidates" element={<ShowCandidates Salert={Salert} />} />
            <Route exact path="/admin/batches/addbatch" element={<AddBatch Salert={Salert} />} />
            <Route exact path="/admin/batches/addbatch/create" element={<AddBatchForm Salert={Salert} />} />
           
          </Route>

          <Route exact path="/signup" element={<SingnUp Salert={Salert}/>} /> 
          <Route exact path="/login" element={<Login Salert={Salert}/>} />

          <Route exact path="/dashboard" element={<Template Salert={Salert}/>}>
            <Route exact path="/dashboard" element={<Courses Salert={Salert}/>} />
            <Route exact path="/dashboard/profile" element={<UserProfile Salert={Salert}/>}></Route>
            <Route exact path="/dashboard/courses" element={<Courses Salert={Salert}/>} />
            <Route exact path="/dashboard/user/step_one" element={<Personal Salert={Salert} />} />
            <Route exact path="/dashboard/user/step_two" element={<Qualification Salert={Salert}/>} /> 
            <Route exact path="/dashboard/user/step_three" element={<Documents Salert={Salert}/>} /> 
            <Route exact path="/dashboard/user/enroll" element={<AppHistory Salert={Salert}/>} /> 
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
