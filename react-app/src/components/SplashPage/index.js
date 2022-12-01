import React, { useState, useEffect } from "react";
import "./SplashPage.css";

const SplashPage = () => {
  return (
    <>
      <div className="main-parent-splash-div">
        <div className="splash-main-container">
          <div className="splash-text-container">
            <h1>Get your next</h1>
            <p>nature inspiration</p>
          </div>
          <div className="splash-main-pin-images-container">
            <div className="pin-column-outer-outer pin-column">
              <div className="pin-image">
                <img src="https://i.pinimg.com/564x/db/c7/e5/dbc7e587c0646d901891a33ad44f1609.jpg"></img>
              </div>
              <div className="pin-image">
                <img src="https://i.pinimg.com/236x/37/c6/98/37c698d2d9bbaa25d9aabfa447c90447.jpg"></img>
              </div>
              <div className="pin-image">
                <img src="https://i.pinimg.com/236x/dc/a2/93/dca293d2a28a3efdefa486095ecfcff1.jpg"></img>
              </div>
            </div>
            <div className="pin-column-outer-inner pin-column">
              <div className="pin-image">
                <img src="https://i.pinimg.com/236x/f7/04/82/f704828602a5a9e96a1787da0dc9067e.jpg"></img>
              </div>
              <div className="pin-image">
                <img src="https://i.pinimg.com/236x/9a/8c/d4/9a8cd4a8cf26cf3b1f422d39e0697a05.jpg"></img>
              </div>
              <div className="pin-image">
                <img src="https://i.pinimg.com/236x/f0/95/38/f0953819d3b0a0266de4a92c070adaa5.jpg"></img>
              </div>
            </div>
            <div className="pin-column-inner-inner pin-column">
              <div className="pin-image">
                <img src="https://i.pinimg.com/236x/26/68/9f/26689fcef4b6d97ec0a57bb823f149bd.jpg"></img>
              </div>
              <div className="pin-image">
                <img src="https://i.pinimg.com/236x/0f/e7/ad/0fe7ad22f906ec32ecad533198b64565.jpg"></img>
              </div>
              <div className="pin-image">
                <img src="https://i.pinimg.com/236x/27/8b/23/278b235ffa97a135507c8a54c170200e.jpg"></img>
              </div>
            </div>
            <div className="pin-column-center pin-column">
              <div className="pin-image">
                <img src="https://i.pinimg.com/236x/81/62/c9/8162c9c13d7884ecd942828e304cce4a.jpg"></img>
              </div>
              <div className="pin-image">
                <img src="https://i.pinimg.com/236x/62/a1/82/62a18227a9e5047e0d70be60a885ecba.jpg"></img>
              </div>
              <div className="pin-image">
                <img src="https://i.pinimg.com/236x/10/c1/ab/10c1ab972a103bedee81c872d5cf98f5.jpg"></img>
              </div>
            </div>
            <div className="pin-column-inner-inner pin-column">
              <div className="pin-image">
                <img src="https://i.pinimg.com/236x/32/f8/66/32f8667788e0fe2201019785426b36d9.jpg"></img>
              </div>
              <div className="pin-image">
                <img src="https://i.pinimg.com/236x/40/1f/1d/401f1d41fcdd09451d79e9d9e423a9d6.jpg"></img>
              </div>
              <div className="pin-image">
                <img src="https://i.pinimg.com/236x/7c/b4/2d/7cb42d4b9c922e42e320d444bae3aeef.jpg"></img>
              </div>
            </div>
            <div className="pin-column-outer-inner pin-column">
              <div className="pin-image">
                <img src="https://i.pinimg.com/236x/78/83/67/7883676c6a2156d5d81ef93c96455272.jpg"></img>
              </div>
              <div className="pin-image">
                <img src="https://i.pinimg.com/236x/d2/ab/ba/d2abbacebd30efb029a506054887ab14.jpg"></img>
              </div>
              <div className="pin-image">
                <img src="https://i.pinimg.com/236x/5e/29/82/5e29825a6212c472bfd79a24c4a2a59f.jpg"></img>
              </div>
            </div>
            <div className="pin-column-outer-outer pin-column">
              <div className="pin-image">
                <img src="https://i.pinimg.com/236x/37/d6/ee/37d6ee7336608f7f8f61735bfc375fae.jpg"></img>
              </div>
              <div className="pin-image">
                <img src="https://i.pinimg.com/236x/d9/6c/8e/d96c8ebb6fd4b7e69ea8700c07d6b525.jpg"></img>
              </div>
              <div className="pin-image">
                <img src="https://i.pinimg.com/236x/08/b8/d4/08b8d444dfe974673f130e41d3a60227.jpg"></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SplashPage;
