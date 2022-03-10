import React from "react";
import styled from 'styled-components';

const Adventures = styled.h2`
display: flex;
align-items: center;
justify-content: center;
font-family: 'Press Start 2P', cursive;
font-size: 25px;
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
width: 100%;
padding-bottom: 16px;
padding-top: 20px;
`

export default function MapHeader() {
  return (
    <Adventures>
      Adventures{" "}
    </Adventures>
  );
}