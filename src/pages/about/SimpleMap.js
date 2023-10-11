import React from "react";
import GoogleMapReact from 'google-map-react';


export default function SimpleMap(){
  const defaultProps = {
    center: {
        lat: 41.7118,
        lng: 44.7568
    },
    zoom: 10
  };

  return (
    <div className="h-[50vh] w-[80%] flex justify-center items-center mx-auto ">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
      </GoogleMapReact>
    </div>
  );
}