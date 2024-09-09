import {
	Route,
	createHashRouter,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";
import { HistoryPage } from "../pages/history-page";
import { MainPage } from "../pages/main-page";
import { SettingsPage } from "../pages/settings-page";
import { WorkoutRouter } from "./workout-router";
import { WorkoutPlayerPage } from "../pages/workout-player-page";

export const AppRoutes = () => {
	return (
		<RouterProvider
			router={createHashRouter(
				createRoutesFromElements(
					<>
						<Route path="/" element={<MainPage />} />
						<Route path="/workout/*" element={<WorkoutRouter />} />
						<Route
							path="/player/:name"
							element={<WorkoutPlayerPage />}
						/>
						<Route path="/settings" element={<SettingsPage />} />
						<Route path="/history" element={<HistoryPage />} />
					</>
				)
			)}
		/>
	);
};
