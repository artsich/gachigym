import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage } from "./pages/main-page";
import { WorkoutPage } from "./pages/workout-page";
import { SettingsPage } from "./pages/settings-page";
import { Footer } from "antd-mobile";

const WorkoutRouter = () => {
	return (
		<Routes>
			<Route path="" element={<WorkoutPage />} />
			<Route path=":id" element={<WorkoutPage />} />
		</Routes>
	);
};

function footherContent() {
	const year = new Date().getFullYear();
	return `@ ${year} gachy.tracker All rights reserved`;
}

export const App = () => {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/workout/*" element={<WorkoutRouter />} />
					<Route path="/settings" element={<SettingsPage />} />
				</Routes>
			</Router>
			<Footer content={footherContent()} />
		</>
	);
};
