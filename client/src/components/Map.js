import React from 'react';
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import '../App.css';


export default function Map (props) {
  // Default to Cupertino, CA lat and lon
  const { lat = 37.323002, lng = -122.032181 } = props;
  const { isLoaded } = useLoadScript({
    // create-react-app out of the box, reads all env variables starts with `REACT_APP_` from '.env' file.
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  return (
    <div className="Map">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={{ lat, lng }}
          zoom={13}
        >
          <MarkerF position={{ lat, lng }} />
        </GoogleMap>
      )}
    </div>
  );
}
