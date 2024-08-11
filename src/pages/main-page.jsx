import { Button, Space } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import {
	isTrainingInProgress,
	getPrograms,
	getProgramByName,
	deleteProgram,
	saveCurrentWorkout
} from "../services/workout-service";
import {
	EyeOutline,
	AddCircleOutline,
	InformationCircleOutline,
} from "antd-mobile-icons";
import { useState } from "react";
import { Programs } from "../components/programs";

const styles = {
	templateCard: {
		flex: "0 0 auto",
		cursor: "pointer",
	},
	newWorkoutButton: {
		background: "#BDECB6",
	},
	historyButton: {
		background: "#4285b4",
	},
	currentWorkoutButton: {
		background: "#FFFDD0",
	},
};

// TODO: Icons looks bad!
export const MainPage = () => {
	const navigate = useNavigate();
	const [programs, setPrograms] = useState(getPrograms());

	const openProgram = (name) => {
		// TODO: Check that current not exists. if do, open modal and ask to rewrite current workout
		const program = getProgramByName(name)
		saveCurrentWorkout({ name: program.name, exercises: [...program.exercises] })
		navigate("/workout/current")
	}

	const handleDeleteProgram = (program) => {
		deleteProgram(program.name)
		setPrograms(getPrograms())
	}

	return (
		<Space direction="vertical" block style={{ padding: "16px" }}>
			{isTrainingInProgress() ? (
				<Button
					icon={<InformationCircleOutline />}
					size="large"
					className="mainButton"
					style={styles.currentWorkoutButton}
					onClick={() => navigate("/workout/current")}
					block
				>
					Текущая тренировка
				</Button>
			) : (
				<Button
					size="large"
					className="mainButton"
					style={styles.newWorkoutButton}
					onClick={() => navigate("/workout")}
					block
				>
					<AddCircleOutline /> Новая тренировка
				</Button>
			)}
			<Button
				type="primary"
				size="large"
				className="mainButton"
				style={styles.historyButton}
				onClick={() => navigate("/workouts")}
				block
			>
				<EyeOutline /> История
			</Button>
			<Programs
				programs={programs}
				onOpen={(program) => openProgram(program.name)}
				onDelete={(program) => handleDeleteProgram(program)} />
		</Space >
	);
};
