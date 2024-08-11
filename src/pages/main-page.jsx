import { Button, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import {
	isTrainingInProgress,
	getPrograms,
	getProgramByName,
	deleteProgram,
	saveCurrentWorkout
} from "../services/workout-service";
import {
	EyeOutlined,
	PlusCircleTwoTone,
	InfoCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Programs } from "../components/programs";

const styles = {
	container: {
		padding: "16px",
	},
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
		<div style={styles.container}>
			<Flex gap="middle">
				<Button
					icon={<EyeOutlined />}
					type="primary"
					size="large"
					className="mainButton"
					style={styles.historyButton}
					onClick={() => navigate("/history")}
					block
				>
					History
				</Button>

				{isTrainingInProgress() ? (
					<Button
						icon={<InfoCircleOutlined />}
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
						icon={<PlusCircleTwoTone />}
						size="large"
						className="mainButton"
						style={styles.newWorkoutButton}
						onClick={() => navigate("/workout")}
						block
					>
						Новая тренировка
					</Button>
				)}
			</Flex>
			<Programs
				programs={programs}
				onOpen={(program) => openProgram(program.name)}
				onDelete={(program) => handleDeleteProgram(program)} />
		</div >
	);
};
