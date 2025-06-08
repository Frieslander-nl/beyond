import { useEffect, useState } from "react";

function NeoExplorer() {
  const [date, setDate] = useState(() => {
    const today = new Date().toISOString().split("T")[0];
    return today;
  });
  const [neos, setNeos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_NASA_API_KEY;

  const fetchNEOs = () => {
    setLoading(true);
    setError(null);

    fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        const result = data.near_earth_objects[date] || [];
        setNeos(result);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch NEO data.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchNEOs();
  }, []);

  return (
    <div className="neo-explorer">
      <h2>🪨 Near-Earth Objects Tracker</h2>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={fetchNEOs}>Search</button>

      {loading && <p>Loading NEO data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {neos.length > 0 ? (
        <ul>
          {neos.map((neo) => {
            const approach = neo.close_approach_data[0];
            return (
              <li key={neo.id}>
                <strong>{neo.name}</strong> <br />
                Diameter:{" "}
                {Math.round(
                  neo.estimated_diameter.meters.estimated_diameter_max
                )}{" "}
                m <br />
                Speed: {Math.round(approach.relative_velocity.kilometers_per_hour)} km/h <br />
                Miss Distance: {Math.round(approach.miss_distance.kilometers)} km <br />
                Hazardous: {neo.is_potentially_hazardous_asteroid ? "Yes" : "No"}
              </li>
            );
          })}
        </ul>
      ) : (
        !loading && <p>No NEOs found for this date.</p>
      )}
    </div>
  );
}

export default NeoExplorer;
