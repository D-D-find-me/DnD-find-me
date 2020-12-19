import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import { formatRelative } from "date-fns";
import "@reach/combobox/styles.css";

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

const Map = () => {
  const [zipcode, setZipcode] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  

  // Need a method to return nearby adventures

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Title"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
        />
      </form>
      <div>Map will appear here</div>
    </div>
  );
};

export default Map;
