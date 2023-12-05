import React from "react";
// import 'dotenv/config'
import logo1 from "./../../assets/images/nielit.png";
import lions from "./../../assets/images/emblem33.png";
import bcg from "./../../assets/images/headerbackground.jpg";

export default function Header() {
  return (
    <header>
      <div style={{ backgroundImage: `url(${bcg})` }}>
        <table className="container-fluid">
          <tbody>
            <tr>
              <td className="m-0 p-0">
                <img className="img-fluid" src={logo1} />
              </td>
              <td className="d-flex  flex-column justify-content-center align-items-center">
                <h1
                  style={{
                    letterSpacing: "2rem",
                    fontWeight: "400",
                    textShadow: "2px 2px grey",
                  }}
                >
                  NIELIT
                </h1>

                <h1 style={{ fontSize: "2.2vw" }}>
                  {" "}
                  National Institute of Electronics and Information Technology,
                  Haridwar
                </h1>
                <p style={{ fontSize: "1.2vw" }}>
                  An Autonomous Scientific Society of Ministry of Electronics &
                  Information Technology (MeitY), Government of India
                </p>
              </td>
              <td style={{}}>
                <img
                  className="img-fluid"
                  style={{ width: "6rem" }}
                  src={lions}
                />
              </td>
            

       
            </tr>
          </tbody>
        </table>
      </div>
    </header>
  );
}
