import { Button, Dialog, Space } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import {
	isCurrentWorkoutExist,
	isTrainingInProgress,
	saveCurrentWorkout,
} from "../services/workout-service";
import {
	EyeOutline,
	AddCircleOutline,
	InformationCircleOutline,
	SetOutline,
} from "antd-mobile-icons";
import { useState } from "react";
import { Programs } from "../components/programs";
import {
	Program,
	deleteProgram,
	getProgramByName,
	getPrograms,
} from "../services/program-service";

const styles = {
	templateCard: {
		flex: "0 0 auto",
		cursor: "pointer",
	},
	newWorkoutButton: {
		// todo: Fix for dark theme...
		background: "#4285b4",
	},
	historyButton: {
		// todo: Fix for dark theme...
		background: "#4285b4",
	},
	currentWorkoutButton: {
		background: "#4285b4",
	},
};

// TODO: Icons looks bad!
export const MainPage = () => {
	const navigate = useNavigate();
	const [programs, setPrograms] = useState(getPrograms());

	const openProgram = (name: string) => {
		const program = getProgramByName(name);
		if (program) {
			if (isCurrentWorkoutExist()) {
				Dialog.confirm({
					title: "Wan't to replace current workout?",
					onConfirm: () => {
						navigateToProgram(program);
					},
				});
			} else {
				navigateToProgram(program);
			}
		}
	};

	const navigateToProgram = (program: Program) => {
		saveCurrentWorkout({
			name: program.name,
			exercises: [...program.exercises],
		});
		navigate("/workout/current");
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
					color="primary"
					style={styles.currentWorkoutButton}
					onClick={() => navigate("/workout/current")}
					block
				>
					<InformationCircleOutline />
					<span> Current workout</span>
				</Button>
			) : (
				<Button
					size="large"
					color="primary"
					onClick={() => navigate("/workout")}
					block
				>
					<AddCircleOutline />
					<span> New workout</span>
				</Button>
			)}
			<Button
				color="primary"
				size="large"
				onClick={() => navigate("/history")}
				block
			>
				<EyeOutline />
				<span> История</span>
			</Button>
			<Button
				block
				color="primary"
				size="large"
				className="mainButton"
				onClick={() => navigate("/settings")}
				style={{ marginTop: "32px" }}
			>
				<SetOutline />
				<span> Settings</span>
			</Button>
			<Programs
				programs={programs}
				onOpen={(program: any) => openProgram(program.name)}
				onDelete={(program: any) => handleDeleteProgram(program)}
			/>
		</Space>
	);
};
