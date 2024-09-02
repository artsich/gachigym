import { useNavigate, useParams } from "react-router-dom";
import { WorkoutPlayer } from "../components/workout-player/workout-player";
import { getProgramByName } from "../services/program-service";
import { saveWorkout } from "../services/workout-service";
import { ErrorBlock } from "antd-mobile";

export const WorkoutPlayerPage = () => {
	const { name } = useParams();
	const navigate = useNavigate();

	const program = getProgramByName(name!);

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
		<WorkoutPlayer
			program={program}
			onFinish={(workout) => {
				saveWorkout(workout);
				navigate("/");
			}}
		/>
	);
};
