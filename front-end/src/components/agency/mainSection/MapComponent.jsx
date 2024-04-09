import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const redIcon = L.icon({
  iconUrl: "/src/images/map-marker.png",
  iconSize: [50, 40], // Size of the icon, in pixels
  iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
});

const UpdateMap = () => {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);
  return null;
};

const MapComponent = () => {
  const position = [35.3606, 138.7278]; // Coordinates of Mount Fuji
  const zoom = 12; // Adjusted zoom level

  return (
    <div className="map-container">
      <MapContainer center={position} zoom={zoom}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} icon={redIcon}></Marker>
        <UpdateMap />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
