import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import opencage from "opencage-api-client";

const redIcon = L.icon({
  iconUrl: "/src/images/map-marker.png",
  iconSize: [50, 40], // Size of the icon, in pixels
  iconAnchor: [23, 40], // Point of the icon which will correspond to marker's location
});

const SetViewOnClick = ({ coords }) => {
  const map = useMap();

  useEffect(() => {
    if (coords) {
      map.flyTo(coords, map.getZoom());
    }
  }, [coords, map]);

  return null;
};

const MapComponent = ({ place }) => {
  const [position, setPosition] = useState([36.5882, 2.4481]);
  useEffect(() => {
    const fetchGeoCode = async () => {
      try {
        const response = await opencage.geocode({
          q: place,
          key: "6dfbc9a38af84df1aced5dd9b3a90872",
        });
        if (response.results && response.results.length > 0) {
          const { lat, lng } = response.results[0].geometry;
          setPosition([lat, lng]);
        }
      } catch (error) {
        console.error("Error geocoding:", error);
      }
    };

    fetchGeoCode();
  }, [place]); // Re-run the effect when `place` changes

  return (
    <div className="map-container">
      <MapContainer center={position} zoom={9}>
        <SetViewOnClick coords={position} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} icon={redIcon} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
