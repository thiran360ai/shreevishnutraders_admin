import React, { useState } from "react";
import "../assets/css/home.css";

import { Scrollbars } from "react-custom-scrollbars-2";

const Home = () => {
  const data = [
    {
      imgFileName: "arabian-ranches-ii.jpg",
      title: "Arabian Ranches",
      description:
        "Arabian Ranches offers a modern interpretation of the soothing charm of the surrounding desertscape. The development features a number of residential communities that draw inspiration from Spanish and Arabian architecture.",
    },
    {
      imgFileName: "arabian-ranches.jpg",
      title: "Arabian Ranches II",
      description:
        "Arabian Ranches offers a modern interpretation of the soothing charm of the surrounding desertscape. The development features a number of residential communities that draw inspiration from Spanish and Arabian architecture.",
    },
    {
      imgFileName: "downtown-dubai.jpg",
      title: "Downtown Dubai",
      description:
        "The Centre of Now. The most prestigious square kilometre in the world. Downtown Dubai is no stranger to such accolades, and yet it’s hard to overstate the prominence of this community.",
    },
    {
      imgFileName: "dubai-hills-estate.jpg",
      title: "Dubai Hills Estate",
      description:
        "Sustainably designed, Dubai Hills Estate is a first of its kind destination. This masterfully-planned 2,700-acre multi-purpose development will form an integral part of the Mohammed Bin Rashid City.",
    },
    {
      imgFileName: "dubai-marina.png",
      title: "Dubai Marina",
      description:
        "Dubai Marina is one of the world’s largest, most meticulously planned waterfront developments and offers the exhilaration and vibrancy of a chic, urban lifestyle together with all the advantages of living on the water.",
    },
    {
      imgFileName: "emirates-living.jpg",
      title: "Emirates Living",
      description:
        "Launched in 2003, Emirates Living is a modern lifestyle community focused on outdoor leisure. Emirates Living offers a serene nature-filled sanctuary, with 8,659 premium villas nestled within 52.2 million square feet of lush greenery.",
    },
  ];

  const [startIndex, setStartIndex] = useState(0);

  const handleClick = () => {
    console.log("btn clk");
    setStartIndex((prevIndex) => (prevIndex + 3) % data.length);
  };

  return (
    <div>
      <div className="container">
        <h1 className="text-center m-4">COMMUNITIES WE MANAGE</h1>

        <div className="d-flex justify-content-center align-items-center">
          <div className="row g-5">
            {data.map((item, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div className="card rounded-0">
                  <img
                    src={require(`../assets/images/${item.imgFileName}`)}
                    className="card-img-top rounded-0"
                    alt="Card image"
                    style={{ height: "250px" }}
                  />
                  <div className="card-body">
                    <div className="card-text-container">
                      <p className="card-text">{item.description}</p>
                    </div>
                  </div>

                  <div className="card-title-container">
                    <h5 className="card-title">{item.title}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h1
          className="text-center"
          style={{ marginTop: "60px", marginBottom: "40px" }}
        >
          OUR SERVICES
        </h1>

        <div
          className="d-none d-md-block position-relative"
          style={{ marginBottom: "20px" }}
        >
          <div className="row">
            {data.slice(startIndex, startIndex + 3).map((item, index) => (
              <div key={index} className="col-md-4">
                <img
                  src={require(`../assets/images/${item.imgFileName}`)}
                  style={{ height: "50vh" }}
                  className="img-fluid"
                  alt={`Image ${startIndex + index + 1}`}
                />

                <div
                  className="d-flex justify-content-center"
                  style={{
                    color: "white",
                    marginTop: "-50px",
                    fontWeight: "bold",
                    zIndex: 3,
                  }}
                >
                  <h3>{item.title}</h3>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "-200px" }}>
            <button
              className="arrow-button"
              onClick={() => handleClick(-3)}
              style={{
                left: 0,
                transform: "translateX(-50%)",
                position: "absolute",
                border: "none",
              }}
            >
              &larr;
            </button>

            <button
              className="arrow-button"
              onClick={() => handleClick(-3)}
              style={{
                position: "absolute",
                right: 0,
                border: "none",
                transform: "translateX(50%)",
              }}
            >
              &rarr;
            </button>
          </div>
        </div>
      </div>

      <div style={{ height: "65vh", marginLeft: "30px" }}>
        <Scrollbars>
          <div className="d-md-none container-fluid p-0">
            <div className="d-flex flex-row flex-nowrap">
              {data.map((item, index) => (
                <div key={index} className="mr-2">
                  <img
                    src={require(`../assets/images/${item.imgFileName}`)}
                    alt={`Slide ${index + 1}`}
                    style={{
                      width: "350px",
                      height: "400px",
                      marginRight: "20px",
                    }}
                  />

                  <div
                    className="d-flex justify-content-center"
                    style={{
                      color: "white",
                      marginTop: "-50px",
                      fontWeight: "bold",
                      zIndex: 3,
                    }}
                  >
                    <h3>{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Scrollbars>
      </div>
    </div>
  );
};

export default Home;
