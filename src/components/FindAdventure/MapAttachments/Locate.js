import React from "react";
import styled from "styled-components";

const LocateButton = styled.button`
background-color: transparent;
border: none;
`

const Compass = styled.img`
height: 50px;
width: 50px;
`

function Locate({ panTo }) {
  return (
    <LocateButton 
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
      <Compass src="compass.jpg" alt="compass"/>
    </LocateButton>
  );
}

export default Locate;