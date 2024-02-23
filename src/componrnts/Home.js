import React, { useState, useRef } from "react";
import "../assets/css/home.css"
const Home = () => {
  const data = [
    {
      imgFileName: "arabian-ranches-ii.jpg",
      title: "Arabian Ranches",
      description: "Arabian Ranches offers a modern interpretation of the soothing charm of the surrounding desertscape. The development features a number of residential communities that draw inspiration from Spanish and Arabian architecture."
    },
    {
      imgFileName: "arabian-ranches.jpg",
      title: "Arabian Ranches II",
      description: "Arabian Ranches offers a modern interpretation of the soothing charm of the surrounding desertscape. The development features a number of residential communities that draw inspiration from Spanish and Arabian architecture."
    },
    {
      imgFileName: "downtown-dubai.jpg",
      title: "Downtown Dubai",
      description: "The Centre of Now. The most prestigious square kilometre in the world. Downtown Dubai is no stranger to such accolades, and yet it’s hard to overstate the prominence of this community."
    },
    {
      imgFileName: "downtown-dubai.jpg",
      title: "Downtown Dubai",
      description: "The Centre of Now. The most prestigious square kilometre in the world. Downtown Dubai is no stranger to such accolades, and yet it’s hard to overstate the prominence of this community."
    },
    {
      imgFileName: "downtown-dubai.jpg",
      title: "Downtown Dubai",
      description: "The Centre of Now. The most prestigious square kilometre in the world. Downtown Dubai is no stranger to such accolades, and yet it’s hard to overstate the prominence of this community."
    },
    {
      imgFileName: "downtown-dubai.jpg",
      title: "Downtown Dubai",
      description: "The Centre of Now. The most prestigious square kilometre in the world. Downtown Dubai is no stranger to such accolades, and yet it’s hard to overstate the prominence of this community."
    },
  ];


  const [startIndex, setStartIndex] = useState(0);

  const handleClick = () => {
    setStartIndex((prevIndex) => (prevIndex + 3) % data.length);
  };


  const containerRef = useRef(null);

  const handleScroll = (event) => {
    // Update the scrollLeft property of the container
    containerRef.current.scrollLeft += event.deltaY;
  };

  return (
    <div>

  
    <div className="container">

      <h1 className="text-center m-4">COMMUNITIES WE MANAGE</h1>



    <div className="d-flex justify-content-center align-items-center">
    <div className="row g-5">
      {data.map((item, index) => (
        <div key={index} className="col-lg-4 col-md-6">
          <div className="card">
            <img
              src={require(`../assets/images/${item.imgFileName}`)}
              className="card-img-top"
              alt="Card image"
              style={{ height: '250px' }}
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







  <div className="container py-5">
  <h1 className="text-center m-4">OUR SERVICES</h1>


      {/* Desktop View */}
      <div className="d-none d-md-block">
        <div className="row">
          {data.slice(startIndex, startIndex + 3).map((item, index) => (
            <div key={index} className="col-md-4">
              <img
                src={require(`../assets/images/${item.imgFileName}`)}
                style={{height:"50vh"}}
                
                className="img-fluid"
                alt={`Image ${startIndex + index + 1}`}
              />


           
            </div>
          ))}

        </div>
        <div className="d-flex justify-content-between">

        <button
              className="arrow-button"
              onClick={() => handleClick(-3)}
              >
              &larr;
            </button>


            <button
              className="arrow-button"
              onClick={() => handleClick(3)}
              >
              &rarr;
            </button>

              </div>
      </div>




<div
      className="d-md-none"
      ref={containerRef}
      onWheel={handleScroll}
      style={{ overflow: 'hidden' }}
    >
      <div className="d-flex flex-row flex-nowrap">
        {data.map((item, index) => (
          <div key={index} className="mr-2">
            <img
              src={require(`../assets/images/${item.imgFileName}`)}
              alt={`Slide ${index + 1}`}
              style={{ width: '350px', height: '400px', marginRight:"20px"}}
            />
          </div>
        ))}
      </div>
    </div>
   

     
    </div>















      </div>


      
      </div>
  );
};

export default Home;
