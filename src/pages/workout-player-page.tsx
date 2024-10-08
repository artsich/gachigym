import { useNavigate, useParams } from "react-router-dom";
import { WorkoutPlayer } from "../components/workout-player/workout-player";
import { getProgramByName } from "../services/program-service";
import { saveWorkout } from "../services/workout-service";
import { ErrorBlock } from "antd-mobile";
import { RouterBlocker } from "../components/shared/router-blocker";
import { useEffect, useState } from "react";

export const WorkoutPlayerPage = () => {
	const { name } = useParams();
	const navigate = useNavigate();
	const [workoutFinished, setWorkoutFinished] = useState(false);

	const program = getProgramByName(name!);

	useEffect(() => {
		if (workoutFinished) {
			navigate("/");
		}
	}, [workoutFinished, navigate]);

	if (!program) {
		console.error(`Program ${name} is not found!`);
		return (
			<ErrorBlock
				status="empty"
				title={`Program "${name}" is not found!`}
				description=""
			/>
		);
	}

	return (
		<>
			<WorkoutPlayer
				program={program}
				onFinish={(workout) => {
					if (!workoutFinished) {
						saveWorkout(workout);
						setWorkoutFinished(true);
					}
				}}
			/>
			<RouterBlocker
				when={!workoutFinished}
				title="Workout will not be saved."
			/>
		</>
	);
};
