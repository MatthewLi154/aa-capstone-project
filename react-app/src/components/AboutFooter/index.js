import React from "react";

const AboutFooter = () => {
  const styles = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    bottom: "0px",
    backgroundColor: "yellow",
    color: "black",
    height: "2rem",
    alignItems: "center",
    fontSize: "16px",
    padding: "0.25rem",
  };

  const blurStyles = {
    width: "100%",
    height: "3.5rem",
    backgroundColor: "white",
    position: "absolute",
    bottom: "2rem",
    filter: "blur(33px)",
  };

  return (
    <>
      <div style={styles}>
        <a
          href="https://github.com/MatthewLi154/pinature-capstone-project"
          target="_blank"
          style={{
            textDecoration: "none",
            margin: "0rem 10rem",
            color: "black",
            fontWeight: "300",
          }}
        >
          <i class="fa-brands fa-github"></i> Matthew Li
        </a>
        <a
          href="https://www.linkedin.com/in/matthew-li-76b174161/"
          target="_blank"
          style={{
            textDecoration: "none",
            margin: "0rem 10rem",
            color: "black",
            fontWeight: "300",
          }}
        >
          <i class="fa-brands fa-linkedin-in"></i> Matthew Li
        </a>
      </div>
      <div style={blurStyles}>
        <div></div>
      </div>
    </>
  );
};

export default AboutFooter;
