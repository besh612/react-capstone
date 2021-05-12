import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import keys from "../../config/credentials.json";

function MapView(): React.ReactElement {
  const locations = [
    {
      name: "Location 1",
      location: {
        lat: 37.53339056761057,
        lng: 126.9673059003992,
      },
    },
  ];

  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  return (
    <LoadScript googleMapsApiKey={keys.accessKeyId}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={16}
        center={{
          lat: 37.53339056761057,
          lng: 126.9673059003992,
        }}
      >
        {locations.map((item) => (
          <Marker key={item.name} position={item.location} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default MapView;
