import React from "react";
import { InfoWindow } from "@react-google-maps/api";
import { formatRelative, parseISO } from "date-fns";
import styled from "styled-components";
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

const DeleteAdventure = styled.button`
box-shadow: 0px 1px 0px 0px #1c1b18;
background: linear-gradient(to bottom, #eae0c2 5%, #ccc2a6 100%);
background-color: #eae0c2;
border-radius: 15px;
border: 2px solid #333029;
height: auto;
width: 150px;
display: inline-block;
cursor: pointer;
color: black;
font-family: 'Ubuntu Mono', monospace;
font-size: 20px;
font-weight: bold;
text-decoration: none;
text-shadow: 0px 1px 0px #ffffff;
  margin: 10px;
`
const Window = styled.div`
font-family: 'Ubuntu Mono', monospace;
display: flex;
flex-direction:column;
align-items:center;
justify-content:center;
background-image: url("map.png");
background-position: center;
`
const WindowTitle = styled.h3`
font-size: 25px;
font-style: italic;
margin-bottom: 8px;
`

const WindowContent = styled.p`
font-size: 18px;
font-weight:bold;
`
const ProfLink = styled.button`
box-shadow: 0px 1px 0px 0px #1c1b18;
	background: linear-gradient(to bottom, #eae0c2 5%, #ccc2a6 100%);
	background-color: #eae0c2;
	border-radius: 15px;
  border: 2px solid #333029;
  height: auto;
  width: 125px;
	display: inline-block;
    cursor: pointer;
    color: black;
    align-self: center;
    font-family: 'Ubuntu Mono', monospace;
	font-size: 20px;
  font-weight: bold;
  justify-content: center;
	align-items: center;
	text-decoration: none;
    text-shadow: 0px 1px 0px #ffffff;
    margin: 8px;
`


 function AlertWindow({ selected, close, deleteLocation, user, username }) {
  

  return (
    <InfoWindow
      position={{ lat: selected.latitude, lng: selected.longitude }}
      onCloseClick={() => close()}
    >
      <Window>
        <WindowTitle>
          Hark!!
        </WindowTitle>
        <WindowContent>
          Thine Adventure Awaits! {formatRelative(parseISO(selected.created_at), new Date())}
        </WindowContent>
        <ProfLink>
          <Link style={{color:"black"}} to={`/profile/${selected.adv_id}`}>Find DM</Link>
        </ProfLink>
        {user.id === selected.adv_id ? <DeleteAdventure onClick={() => deleteLocation(selected.id)}>Delete</DeleteAdventure>: null}
      </Window>
    </InfoWindow>
  );
}
const mapStateToProps = state => state;

export default connect(mapStateToProps)(AlertWindow)