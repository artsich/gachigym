import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/main-page';
import { WorkoutPage } from './pages/workout-page';
import { WorkoutsPage } from './pages/workouts-page';
import { styles } from './styles/style.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/workout" element={<WorkoutPage />} />
        <Route path="/current-workout" element={<WorkoutPage loadCurrent />} />
        <Route path="/workouts" element={<WorkoutsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
