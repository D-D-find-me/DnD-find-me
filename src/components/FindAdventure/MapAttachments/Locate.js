import React from "react";
import styled from "styled-components";

const LocateButton = styled.button`
background-color: transparent;
border: none;
`

const Compass = styled.img`
height: 50px;
width: 50px;
float: right;
margin-left: 5px
`
const SearchHeader = styled.h3`
  display: flex;
align-items: center;
justify-content: center;
font-family: 'Press Start 2P', cursive;
font-size: 15px;
color: white;
/* Keep this for Combination Stroke/Shadow effect: */
-webkit-text-stroke: 1px black;
  text-shadow:
  3px 3px 0 #000,
  -1px -1px 0 #000,  
  1px -1px 0 #000,
  -1px 1px 0 #000,
  1px 1px 0 #000;
flex-direction: column;
padding-bottom: 16px;
padding-top: 20px;
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
      <Compass src="compass.gif" alt="compass"/>
      <SearchHeader>Click to find your location</SearchHeader>
    </LocateButton>
  );
}

export default Locate;