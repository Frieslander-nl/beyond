import { useState, useEffect } from "react";

function RoverPhoto() {
  const [photos, setPhotos] = useState([]);
  const [date, setDate] = useState("2020-07-01"); // Default date (adjustable)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_NASA_API_KEY;

  const fetchPhotos = () => {
    setLoading(true);
    setError(null);

    fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        setPhotos(data.photos || []);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch rover photos");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPhotos();
  }, []); // Fetch once on mount

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSearch = () => {
    fetchPhotos();
  };

  return (
    <div className="rover-photo">
      <h2>🛸 Mars Rover Photo Explorer</h2>

      <div style={{ marginBottom: "1rem" }}>
        <input type="date" value={date} onChange={handleDateChange} />
        <button onClick={handleSearch} style={{ marginLeft: "0.5rem" }}>
          Search
        </button>
      </div>

      {loading && <p>Loading photos...</p>}
      {error && <p>{error}</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {photos.length > 0 ? (
          photos.map((photo) => (
            <img
              key={photo.id}
              src={photo.img_src}
              alt={`Taken by ${photo.rover.name}`}
              style={{ width: "300px", borderRadius: "8px" }}
            />
          ))
        ) : (
          !loading && <p>No photos found for this date.</p>
        )}
      </div>
    </div>
  );
}

export default RoverPhoto;
