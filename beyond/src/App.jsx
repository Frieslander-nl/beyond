import './App.css';
import PictureOfTheDay from './components/pictureoftheday'; // ⬅️ make sure this path matches your file
import MarsExplorer from './components/roverphoto';
import NeoExplorer from './components/NeoExplorer';

function App() {
  return (
    <div className="App">
      <h1>🌌NASA Picture of the Day</h1>
      <PictureOfTheDay />
      <h1>Daily Rover Photo</h1>
      <MarsExplorer />
      <h1>Neo Explorer</h1>
      <NeoExplorer />
    </div>
  );
}


export default App;
