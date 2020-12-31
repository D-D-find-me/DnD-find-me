import React, {useState, useRef, useCallback,} from "react";
import { GoogleMap, useLoadScript, Marker, Autocomplete } from "@react-google-maps/api";
import { useQuery, useMutation, queryCache } from "react-query";
import Head from "next/head";
import { Search, Locate, AlertWindow, MapHeader } from "./MapAttachments/Index";
import mapStyles from "./MapStyles";
import styled from 'styled-components';
import { Search, Locate, AlertWindow, MapHeader } from "../MapAttachments/Index";
import mapStyles from "../MapStyles";

const MainContainer = styled.div `
  height: 89.9vh;
  background-color: tan;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; 
  background-image: url(wood-2045380_1920.jpg);
`
const MapContainer = styled.div `
  height: 100%;
  width: 500px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-image: url(map.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size:  75vw 1000px ;
  width: 100%;
`
const SearchContainer = styled.div `
display: flex;
margin-top: 10px;
width: 50vw;
justify-content: center;
`


const libraries = ["places"];
const mapContainerStyle = {
  height: "400px",
  width: "50vw",
  margin: "0 auto",
  marginTop: "75px",
  borderRadius: "26px"
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const center ={
  lat: 41.661129,
  lng: -91.530167
}
async function fetchLocationsRequest() {
  const response = await fetch("/api/locations");
  const data = await response.json();
  const { locations } = data;
  return locations;
}

async function createLocationRequest(locationData){
  const response = await fetch('api/locations/create', {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({location: locationData}),
});
const data = await response.json();
const {location} = data
return location;
}

function useCreateLocation() {
  return useMutation(createLocationRequest, {
    onMutate: (locationData) => {
      // 1) cancel queries
      queryCache.cancelQueries("locations");

      // 2) save snapshot
      const snapshot = queryCache.getQueryData("locations");

      // 3) optimistically update cache
      queryCache.setQueryData("locations", (prev) => [
        ...prev,
        {
          id: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          ...locationData,
        },
      ]);

      // 4) return rollback function which reset cache back to snapshot
      return () => queryCache.setQueryData("locations", snapshot);
    },
    onError: (error, locationData, rollback) => rollback(),
    onSettled: () => queryCache.invalidateQueries("locations"),
  });
}

const FindAdventure = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [selected, setSelected] = useState(null);
  const {data: locations} = useQuery("locations", fetchLocationsRequest);
  const createLocation = useCreateLocation();

  const onMapClick = useCallback((e) => {
    createLocation({
      latitude: e.latlng.lat(),
      longitude: e.latlng.lng(),
    })
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
          <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        </Head>
      <MapHeader/>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={4}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {Array.isArray(locations) && locations.map((location) => (
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
          <AlertWindow selected={selected} close={() => setSelected(null)}/>
          )}
      </GoogleMap>
      <SearchContainer>
        <Search panTo={panTo} />
        <Locate panTo={panTo} />
      </SearchContainer>
    </MapContainer>
    </MainContainer>
  );
}

export default FindAdventure;
