import { useEffect, useState } from "react";

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
            latitude: data.iss_position.latitude,
            longitude: data.iss_position.longitude,
          });
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    };

    fetchISS(); // Fetch immediately once
    const intervalId = setInterval(fetchISS, 5000); // Fetch every 5 sec

    return () => clearInterval(intervalId); // Cleanup
  }, []);

  return (
    <div className="iss-tracker">
      <h2>🛰️ International Space Station Live Location</h2>

      {loading && <p>Loading ISS location...</p>}
      {error && <p>Error: {error}</p>}

      {location && (
        <p>
          Latitude: {location.latitude} <br />
          Longitude: {location.longitude}
        </p>
      )}
    </div>
  );
}

export default ISSTracker;
