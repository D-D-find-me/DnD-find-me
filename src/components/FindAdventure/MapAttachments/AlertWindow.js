import React from "react";
import { InfoWindow } from "@react-google-maps/api";
import { formatRelative, parseISO } from "date-fns";

export default function AlertWindow({ selected, close }) {
  return (
    <InfoWindow
      position={{ lat: selected.latitude, lng: selected.longitude }}
      onCloseClick={() => close()}
    >
      <div>
        <h2>
          <span role="img" aria-label="scroll">
          📜
          </span>{" "}
          Alert
        </h2>
        <p>
          Adventure zone located {formatRelative(parseISO(selected.createdAt), new Date())}
        </p>
      </div>
    </InfoWindow>
  );
}