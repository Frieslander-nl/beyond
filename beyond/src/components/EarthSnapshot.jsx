import { useEffect, useState } from "react";
import "./EarthSnapshot.css"; // ⬅️ Space styles live here

function EarthSnapshot() {
  const [latitude, setLatitude] = useState("29.9792");
  const [longitude, setLongitude] = useState("31.1342");
  const [date, setDate] = useState("2018-06-01");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const apiKey = import.meta.env.VITE_NASA_API_KEY;

    const url = `https://api.nasa.gov/planetary/earth/imagery?lon=${longitude}&lat=${latitude}&date=${date}&dim=0.1&api_key=${apiKey}`;

    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Could not load image. Try changing the date or location.");
      }
      const blob = await res.blob();
      setImageUrl(URL.createObjectURL(blob));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSubmit(new Event("submit")); // Load default image
  }, []);

  return (
    <section className="earth-snapshot">
      <h2>🌍 Earth Snapshot</h2>
      <p>View real satellite imagery from NASA based on your location and date.</p>

      <form onSubmit={handleSubmit}>
        <label>
          Latitude:
          <input
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="e.g., 29.9792"
          />
        </label>
        <label>
          Longitude:
          <input
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="e.g., 31.1342"
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <button type="submit">🔍 Get Snapshot</button>
      </form>

      <div className="quick-buttons">
        <p>🌐 Try these:</p>
        <button onClick={() => {
          setLatitude("40.7128");
          setLongitude("-74.0060");
          setDate("2020-10-01");
        }}>📍 New York</button>
        <button onClick={() => {
          setLatitude("35.3606");
          setLongitude("138.7274");
          setDate("2020-05-15");
        }}>🗻 Mount Fuji</button>
        <button onClick={() => {
          setLatitude("-13.1631");
          setLongitude("-72.5450");
          setDate("2019-04-10");
        }}>🏞️ Machu Picchu</button>
      </div>

      {loading && <p className="loading">Loading satellite image...</p>}
      {error && <p className="error">{error}</p>}
      {imageUrl && <img src={imageUrl} alt="Earth snapshot" className="snapshot" />}
    </section>
  );
}

export default EarthSnapshot;
