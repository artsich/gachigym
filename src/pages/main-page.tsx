import { Button, Space } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import {
	isTrainingInProgress,
	saveCurrentWorkout
} from "../services/workout-service";
import {
	EyeOutline,
	AddCircleOutline,
	InformationCircleOutline,
} from "antd-mobile-icons";
import { useState } from "react";
import { Programs } from "../components/programs";
import { Program, deleteProgram, getProgramByName, getPrograms } from "../services/program-service";

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

	const openProgram = (name: string) => {
		// TODO: Check that current not exists. if do, open modal and ask to rewrite current workout
		const program = getProgramByName(name);
		if (program) {
			saveCurrentWorkout({ name: program.name, exercises: [...program.exercises] });
			navigate("/workout/current");
		}
	};

	const handleDeleteProgram = (program: Program) => {
		deleteProgram(program.name);
		setPrograms(getPrograms());
	};

	return (
		<Space direction="vertical" block style={{ padding: "16px" }}>
			{isTrainingInProgress() ? (
				<Button
					size="large"
					className="mainButton"
					style={styles.currentWorkoutButton}
					onClick={() => navigate("/workout/current")}
					block
				>
					<InformationCircleOutline /> Текущая тренировка
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
				color="primary"
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
				onOpen={(program: any) => openProgram(program.name)}
				onDelete={(program: any) => handleDeleteProgram(program)} />
		</Space >
	);
};
