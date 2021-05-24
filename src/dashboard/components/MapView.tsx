import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import keys from "../../config/credentials.json";

type Coords = {
  lat: number;
  lng: number;
};

function MapView({ lat, lng }: Coords): React.ReactElement {
  const locations = [
    {
      name: "Location 1",
      location: {
        lat,
        lng,
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
          lat,
          lng,
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
