import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/ui/LandingPage';
import CakeCreator from './components/ui/CakeCreator';
import ShowcasePage from './components/ui/ShowcasePage';

function App() {
  return (
    <Router>
      <div className="w-full h-screen bg-pastel-cream text-gray-800">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/create" element={<CakeCreator />} />
          <Route path="/:id" element={<ShowcasePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
