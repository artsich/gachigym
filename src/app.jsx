import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/main-page';
import { WorkoutPage } from './pages/workout-page';
import { HistoryPage } from './pages/history-page';
import { styles } from './styles/style.css';

const WorkoutRouter = () => {
    return (
        <Routes>
            <Route path="" element={<WorkoutPage />} />
            <Route path=":id" element={<WorkoutPage />} />
        </Routes>
    );
};

export const App = () => {
	return (
		<Router>
			<Routes>
				<Route exact path="/" element={<MainPage />} />
				<Route path="/workout/*" element={<WorkoutRouter />} />
				<Route path="/history" element={<HistoryPage />} />
			</Routes>
		</Router>
	);
}
