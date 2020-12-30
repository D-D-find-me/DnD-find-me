import React from "react";
import styled from 'styled-components';

const Adventures = styled.p`
  font-family: 'Press Start 2P', cursive;
  font-size: 20px;
`
const Tent = styled.span`
  margin: 0px;
  display: inline;
  font-size: 40px;
`

export default function MapHeader() {
  return (
    <Adventures>
      Adventures{" "}
      <Tent role="img" aria-label="tent">
        ⛺️
      </Tent>
    </Adventures>
  );
}