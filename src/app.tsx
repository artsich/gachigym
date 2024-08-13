import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage } from "./pages/main-page";
import { WorkoutPage } from "./pages/workout-page";

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
				<Route path="/" element={<MainPage />} />
				<Route path="/workout/*" element={<WorkoutRouter />} />
			</Routes>
		</Router>
	);
};
