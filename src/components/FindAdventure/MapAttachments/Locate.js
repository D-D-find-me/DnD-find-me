import React from "react";

function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img src="https://www.animatedimages.org/data/media/91/animated-compass-image-0022.gif" style={{width:"30px", height:"30px", zIndex:"4px"}} alt="compass" />
    </button>
  );
}

export default Locate;