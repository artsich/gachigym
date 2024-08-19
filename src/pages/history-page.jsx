import { getWorkouts } from "../services/workout-service";
import { History } from "../components/history/history";

export const HistoryPage = () => {
	const workouts = getWorkouts();
	return <History workouts={workouts} />;
};
