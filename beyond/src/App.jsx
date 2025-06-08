import './App.css';
import PictureOfTheDay from './components/pictureoftheday'; // ⬅️ make sure this path matches your file
import MarsExplorer from './components/roverphoto';
import NeoExplorer from './components/NeoExplorer';
import ISSTracker from './components/ISSTracker';

function App() {
  return (
    <div className="App">
      <h1>🌌NASA Picture of the Day</h1>
      <PictureOfTheDay />
      <h1>Daily Rover Photo</h1>
      <MarsExplorer />
      <h1>Neo Explorer</h1>
      <NeoExplorer />
      <h1>International Space Station Location</h1>
      <ISSTracker />
    </div>
  );
}


export default App;
