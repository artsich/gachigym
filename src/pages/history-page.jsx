import { getWorkouts, removeAllWorkouts } from "../services/workout-service";
import { History } from "../components/history/history";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const HistoryPage = () => {
	const [workouts, setWorkouts] = useState([]);
	const navigate = useNavigate();

	const reload = () => {
		setWorkouts(getWorkouts());
	};

	useState(() => {
		reload();
	}, []);

	return (
		<History
			workouts={workouts}
			onRemoveAll={() => {
				removeAllWorkouts();
				reload();
			}}
			onCreateNew={() => navigate("/workout")}
		/>
	);
};
