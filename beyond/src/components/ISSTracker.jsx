import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const issIcon = new L.Icon({
  iconUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d0/International_Space_Station.svg",
  iconSize: [40, 40],
});

function ISSTracker() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchISS = () => {
      fetch("http://api.open-notify.org/iss-now.json")
        .then((res) => res.json())
        .then((data) => {
          setLocation({
            latitude: parseFloat(data.iss_position.latitude),
            longitude: parseFloat(data.iss_position.longitude),
          });
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    };

    fetchISS();
    const intervalId = setInterval(fetchISS, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const RecenterMap = ({ lat, lng }) => {
    const map = useMap();
    useEffect(() => {
      map.setView([lat, lng], map.getZoom());
    }, [lat, lng]);
    return null;
  };

  return (
    <div className="iss-tracker">
      <h2>🛰️ International Space Station Live Tracker</h2>

      {loading && <p>Loading ISS location...</p>}
      {error && <p>Error: {error}</p>}

      {location && (
        <>
          <MapContainer
            center={[location.latitude, location.longitude]}
            zoom={3}
            style={{ height: "400px", width: "100%" }}
            scrollWheelZoom={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <Marker
              position={[location.latitude, location.longitude]}
              icon={issIcon}
            >
              <Popup>
                ISS is here! 🌍 <br />
                Lat: {location.latitude.toFixed(2)} <br />
                Lon: {location.longitude.toFixed(2)}
              </Popup>
            </Marker>
            <RecenterMap lat={location.latitude} lng={location.longitude} />
          </MapContainer>

          <p>
            Latitude: {location.latitude} <br />
            Longitude: {location.longitude}
          </p>
        </>
      )}
    </div>
  );
}

export default ISSTracker;
