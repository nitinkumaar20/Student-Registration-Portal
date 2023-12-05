import React from 'react'
// import "./../../style/style.css";
import fb from './../../assets/images/social-logo/fb.png'
import tw from './../../assets/images/social-logo/tw.png'
import yt from './../../assets/images/social-logo/yt.png'
// import bgImg from '../../assets/images/world_pattern.svg'


export default function Footer() {
  return (
  <div style={{bottom:'0' ,width:'100%' }}>

<footer id="footer" class="bg-one">
  <div class="top-footer">
    <div class="container">
      <div class="row justify-content-around">
        <div class="col-lg-4 col-md-6 mb-5 mb-lg-0">
          <h3>About Us</h3>
          <p>National Institute of Electronics & Information Technology (NIELIT),(erstwhile DOEACC Society), an Autonomous Scientific Society under the administrative control of Ministry of Electronics & Information Technology (MoE&IT), Government of India, was set up to carry out Human Resource Development and related activities in the area of Information, Electronics & Communications Technology (IECT). </p>
        </div>
        {/* <!-- End of .col-sm-3 --> */}

        <div class="col-lg-3 col-md-6 mb-5 mb-lg-0">
          <ul style={{listStyle:'none',textDecoration:'none'}} >
            <li style={{textDecoration:'none'}}>
              <h3>Our Courses</h3>
            </li>
            <li  ><a href="service.html" >O Level</a></li>
            <li><a href="service.html">Web Designing</a></li>
            <li><a href="service.html">machine Learning</a></li>
            <li><a href="service.html">Digital marketing</a></li>
          </ul>
        </div>
        {/* <!-- End of .col-sm-3 --> */}

        <div class="col-lg-2 col-md-6 mb-5 mb-md-0">
          <ul style={{listStyle:'none'}}>
            <li>
              <h3>Quick Links</h3>
            </li>
            <li><a href="about.html">Home</a></li>
            <li><a href="service.html">SignUp</a></li>
            <li><a href="blog.html">Login</a></li>
            <li><a href="404.html">Courses</a></li>
          </ul>
        </div>
        {/* <!-- End of .col-sm-3 --> */}

        <div class="col-lg-3 col-md-6">
          <ul style={{listStyle:'none'}}>
            <li>
              <h3>Connect with us Socially</h3>
            </li>
            <li><a href="">Facebook</a></li>
            <li><a href="">Twitter</a></li>
            <li><a href="">Youtube</a></li>
            {/* <li><a href="https://www.github.com/themefisher/">Github</a></li> */}
          </ul>
        </div>
        {/* <!-- End of .col-sm-3 --> */}

      </div>
    </div> 
    
  </div>
  <div class="footer-bottom">
    <h5>&copy; Copyright NIELIT. All rights reserved.</h5>
    {/* <h6>Design and Developed by <a href="https://themefisher.com/">Themefisher</a></h6> */}
  </div>
</footer> 

{/* 
    <footer className=" footer" style={{  backgroundColor: 'var(--secondary)', width: '100%'}}>
      <div className="container-fluid " style={{marginTop: '0', paddingTop: "0"}}>
        <div className="row">
          <div className="col-lg-5 m-2" style={{marginLeft: 0, marginRight: 'auto'}}>
            <h3 className='text-light'>NIELIT Haridwar</h3>
            <p style={{textAlign: 'justifyContent', color:'white'}}>2nd Floor, Government Polytechnic Building, Plot No-6C, Sector-11, Near Pentagon Mall, SIDCUL, Haridwar, Uttarakhand-249403.</p>
          </div>

          <div className="col-lg-6" style={{marginRight: '0', marginLeft: 'auto'}}>
            <p className="text-end  text-secondary" style={{paddingRight: '20px'}}>For more updates follow us on</p>
            <ul className="d-flex justify-content-end pb-3 mb-3 list-unstyled  ">
              <li className="ms-3 ">
                <a  href="#">
               <img src={yt} style={{width:'3rem'}} alt="youtube" />
                </a>
              </li>

              <li className="ms-3 ">
                <a  href="#">
               <img src={fb} style={{width:'3rem'}} alt="youtube" />
                </a>
              </li>

              <li className="ms-3 ">
                <a  href="#">
               <img src={tw} style={{width:'3rem'}} alt="youtube" />
                </a>
              </li>
           
           
            </ul>
          </div>
        </div>

        <p className="text-center text-secondary  border-top p-0 m-0" id="copyright">Copyright &copy; 2022, all rights reserved. This website design and develop by <a href="https://nielit.gov.in/haridwar/" target="_blank" className='text-decoration-none'>NIELIT Haridwar</a></p>
      </div>
    </footer> */}


    </div>
  )
}


