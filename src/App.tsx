
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Trending from './pages/Trending';
import Canvas from './pages/Canvas';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/canvas" element={<Canvas />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;