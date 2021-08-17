import './App.css';
import Post from './Post';

function App() {
  return (
    <div className="App">
      <div className="app-header">
        <h2>Photogram</h2>
      </div>
      <Post/>
      <Post/>
      <Post/>
    </div>
  );
}

export default App;
