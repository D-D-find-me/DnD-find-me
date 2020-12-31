import React from "react";
import { useQuery, useMutation, queryCache } from "react-query";

async function fetchLocations() {
  const response = await fetch("/api/locations");
  const { locations } = await response.json();
  return locations;
}

async function createLocation(newLocation) {
  const response = await fetch("/api/locations/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ location: newLocation }),
  });
  const { location } = await response.json();
  return location;
}

export default function Query() {
  const { data: locations, error } = useQuery("locations", fetchLocations);

  const [mutate] = useMutation(createLocation, {
    xonSuccess: (newLocation) => {
      // queryCache.refetchQueries("locationss");
      queryCache.setQueryData("locations", (prev) => [...prev, newLocation]);
    },

    onMutate: (newData) => {
      queryCache.cancelQueries("locations");

      const snapshot = queryCache.getQueryData("locations");

      queryCache.setQueryData("locations", (prev) => [
        ...prev,
        { ...newData, id: new Date().toISOString() },
      ]);

      return () => queryCache.setQueryData("locations", snapshot);
    },
    onError: (error, newData, rollback) => rollback(),
    onSettled: () => queryCache.refetchQueries("locations"),
  });

  if (error) return <span>Error loading data</span>;
  if (!locations) return <span>loading...</span>;

  return (
    <div>
      <button
        onClick={() => {
          mutate({
            latitude: Math.random() * 100,
            longitude: Math.random() * -100,
          });
        }}
      >
        add
      </button>
      <ul>
        {locations.map((location) => (
          <li key={location.id}>
            {location.latitude},{location.longitude}
          </li>
        ))}
      </ul>
    </div>
  );
}