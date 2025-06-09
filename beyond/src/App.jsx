import './App.css';
import PictureOfTheDay from './components/pictureoftheday'; // ⬅️ make sure this path matches your file
import MarsExplorer from './components/roverphoto';
import NeoExplorer from './components/NeoExplorer';
import ISSTracker from './components/ISSTracker';
import EarthSnapshot from './components/EarthSnapshot';

function App() {
  return (
    <div className="App">
      <section>
        <h1>🌌NASA Picture of the Day</h1>
        <PictureOfTheDay />
      </section>
      <section>
        <h1>Daily Rover Photo</h1>
        <MarsExplorer />
      </section>
      <section>
        <h1>Neo Explorer</h1>
        <NeoExplorer />
      </section>
      <section>
        <h1>International Space Station Location</h1>
        <ISSTracker />
      </section>
      <section>
        <h1>Snapshot of the Earth</h1>
        <EarthSnapshot />
      </section>
    </div>
  );
}


export default App;
