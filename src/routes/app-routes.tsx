import { HashRouter, Routes, Route } from "react-router-dom";
import { HistoryPage } from "../pages/history-page";
import { MainPage } from "../pages/main-page";
import { SettingsPage } from "../pages/settings-page";
import { WorkoutRouter } from "./workout-router";

export const AppRoutes = () => {
	return (
		<HashRouter>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/workout/*" element={<WorkoutRouter />} />
				<Route path="/settings" element={<SettingsPage />} />
				<Route path="/history" element={<HistoryPage />} />
			</Routes>
		</HashRouter>
	);
};
