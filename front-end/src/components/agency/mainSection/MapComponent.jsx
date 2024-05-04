import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import opencage from "opencage-api-client";

const redIcon = L.icon({
  iconUrl: "/src/images/map-marker.png",
  iconSize: [50, 40], // Size of the icon, in pixels
  iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
});

const MapComponent = ({ place = "Tipaza" }) => {
  const SetViewOnClick = ({ coords }) => {
    const map = useMap();

    useEffect(() => {
      if (coords) {
        map.flyTo(coords, map.getZoom());
      }
    }, [coords, map]);

    return null;
  };
  const [position, setPosition] = useState([28.0339, 1.6596]); // Default coordinates for Algeria

  useEffect(() => {
    const fetchGeoCode = async () => {
      try {
        const response = await opencage.geocode({
          q: place,
          key: "6dfbc9a38af84df1aced5dd9b3a90872",
        });

        if (response.results.length > 0) {
          const { lat, lng } = response.results[0].geometry;
          setPosition([lat, lng]);
          map.flyTo([lat, lng], map.getZoom());
          console.log("Coordinates found:", lat, lng);
        } else {
          console.error("Location not found", response);
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    fetchGeoCode();
  }, [place]);

  return (
    <div className="map-container">
      <MapContainer center={position} zoom={7}>
        <SetViewOnClick coords={position} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} icon={redIcon}></Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
