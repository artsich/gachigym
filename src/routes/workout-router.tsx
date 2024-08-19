import { Route, Routes } from "react-router-dom";
import { WorkoutPage } from "../pages/workout-page";

export const WorkoutRouter = () => {
	return (
		<Routes>
			<Route path="" element={<WorkoutPage />} />
			<Route path=":id" element={<WorkoutPage />} />
		</Routes>
	);
};
