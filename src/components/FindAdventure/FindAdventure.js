import React, {useState, useRef, useCallback,} from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useQuery, useMutation, queryCache } from "react-query";
import Head from "next/head";
import { Search, Locate, AlertWindow, MapHeader } from "./MapAttachments/Index";
import mapStyles from "./MapStyles";


const libraries = ["places"];
const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
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
  const [createLocation] = useCreateLocation();

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
    <>
      <Head>
        <title>Adventures</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      </Head>
      <MapHeader/>
      <Locate panTo={panTo} />
      <Search panTo={panTo} />

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
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
    </>
  );
}

export default FindAdventure;
