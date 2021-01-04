import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from 'axios';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import Head from "next/head";
import styled from "styled-components";
import {
  Search,
  Locate,
  AlertWindow,
  MapHeader,
} from "../MapAttachments/Index";
import mapStyles from "../MapStyles";

const MainContainer = styled.div`
  height: 89.9vh;
  background-color: tan;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: url('wood.jpg');
`;
const MapContainer = styled.div`
  height: 100%;
  width: 500px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-image: url(map.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 75vw 1000px;
  width: 100%;
`;
const SearchContainer = styled.div`
  display: flex;
  margin-top: 10px;
  width: 50vw;
  justify-content: center;
`;

const libraries = ["places"];
const mapContainerStyle = {
  height: "400px",
  width: "50vw",
  margin: "0 auto",
  marginTop: "75px",
  borderRadius: "26px",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 41.661129,
  lng: -91.530167,
};

const FindAdventure = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [selected, setSelected] = useState(null);
  const [locations, setLocations] = useState([]);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  
  useEffect(() => {
    // const getLocations = async () => {
    //   try {
    //     const res = await axios.get('/api/locations');
    //     setLocations(res.data)
    //   } catch (err){
    //     console.log("err on getLocations func, frontend")
    //   }
    // };
    getLocations();
  }, []);

  const getLocations = async () => {
    try {
      const res = await axios.get('/api/locations');
      setLocations(res.data)
    } catch (err){
      console.log("err on getLocations func, frontend")
    }
  };
  
  const createLocation = async({latitude, longitude}) => {
    try{
      await axios.post('/api/locations', {latitude, longitude})
    } catch(err) {
      console.log(err)
    }
  };

  const deleteLocation = async (id) => {
    console.log(id)
    try {
      await axios.delete(`/api/locations/${id}`)
      getLocations();
      setSelected(null)
    } catch(err){
      console.log('err on deleteLocation, front end', err)
    }
  };

  const onMapClick = useCallback((e) => {

    createLocation({
      latitude: e.latLng.lat(),
      longitude: e.latLng.lng(),
    });
    getLocations();
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading map...";

  return (
    <MainContainer>
      <MapContainer>
        <Head>
          <title>Adventures</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <MapHeader />
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={4}
          center={center}
          options={options}
          onClick={onMapClick}
          onLoad={onMapLoad}
        >
          {Array.isArray(locations) &&
            locations.map((location) => (
              <Marker
                key={location.id}
                position={{ lat: location.latitude, lng: location.longitude }}
                onClick={() => {
                  setSelected(location);
                }}
                icon={{
                  url: `https://media3.giphy.com/media/YmcGuzRKjHQ4KcR2vd/source.gif`,
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(30, 30),
                  scaledSize: new window.google.maps.Size(60, 60),
                }}
              />
            ))}

          {selected && (
            <AlertWindow selected={selected} close={() => setSelected(null)} deleteLocation={deleteLocation} />
          )}
        </GoogleMap>
        <SearchContainer>
          <Search panTo={panTo} />
          <Locate panTo={panTo} />
        </SearchContainer>
      </MapContainer>
    </MainContainer>
  );
};

export default FindAdventure;
