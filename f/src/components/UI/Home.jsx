import img1 from "./../../assets/images/image1.jpg";
import img2 from "./../../assets/images/image2.jpg";
import img4 from "./../../assets/images/image4.jpg";
import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";
import Courses from "../User/Courses/Courses";
// import bag from 'https://www.nielit.gov.in/sites/default/files/Haridwar/wbl.jpg'
export default function Home() {

  const imgErrror =()=>{
    
  }
  return (
    <>
      <Header />
      <Navbar />
      <main>
        <div className="my-1">
          <div
            id="carouselExampleInterval"
            className="carousel slide "
            data-bs-ride="carousel"
          >
            <div className="carousel-inner" style={{height:'30rem' ,display:'flex',alignItems:'center'}}>
              <div className="carousel-item active" data-bs-interval="10000" >
                <img src="https://www.nielit.gov.in/sites/default/files/Haridwar/wbl.jpg" className="d-block w-100 h-75"  alt="loading" onError={imgErrror} />
              </div>
              <div className="carousel-item" data-bs-interval="2000" >
                <img src="https://nielit.gov.in/sites/default/files/IMG-20230918-WA0012.jpg" className="d-block w-100 h-75" alt="...loading" onError={imgErrror}/>
              </div>
              <div className="carousel-item">
                <img src="https://nielit.gov.in/sites/default/files/NIELITTTTTTT.jpg" className="d-block w-100 h-75" alt=".loading" onError={imgErrror} />
               
              </div>
              <div className="carousel-item">
                <img src=" https://nielit.gov.in/sites/default/files/nielitharidwar_0_1.jpg" className="d-block w-100 h-75" alt="loading" onError={imgErrror}/>
           
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

    
        {/* courses ////////////////////////////////////////////////////////////// */}


        <Courses home={true}/>
      </main>
      <Footer />
    </>
  );
}
