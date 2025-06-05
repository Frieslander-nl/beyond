import { useEffect, useState } from "react";

function PictureOfTheDay() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_NASA_API_KEY;

    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="picture-container">
      {loading && <p>Loading NASA Picture of the Day...</p>}
      {error && <p>Error: {error}</p>}

      {data && (
        <div>
          <h2>{data.title}</h2>
          <p>{data.date}</p>

          {data.media_type === "image" ? (
            <img src={data.url} alt={data.title} style={{ maxWidth: "100%" }} />
          ) : (
            <iframe
              title={data.title}
              src={data.url}
              frameBorder="0"
              allow="encrypted-media"
              allowFullScreen
              style={{ width: "100%", height: "500px" }}
            ></iframe>
          )}

          <p>{data.explanation}</p>
        </div>
      )}
    </div>
  );
}

export default PictureOfTheDay;
