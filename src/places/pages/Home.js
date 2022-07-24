import React from "react";
import { NavLink } from "react-router-dom";
import web from "../../myimages/undraw_camera_re_cnp4.svg";
 
const Home = () => {
  return (
    <section id="header" className="d-flex align-items-center">
      <div className="container-fluid nav_bg">
        <div className="row">
          <div className="col-10 mx-auto">
            <div className="row">
              <div className="col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex justify-content-center flex-column">
                <h1>
                  Upload images using
                  <br />
                  <strong className="brand-name"> Image Gallery App</strong>
                </h1>
              </div>
              <div className="col-lg-6 order-1 order-lg-2 header-img">
                <img src={web} className="img-fluid animated" alt="home img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
