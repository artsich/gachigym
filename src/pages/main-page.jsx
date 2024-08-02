import { Button, Card, Flex } from "antd";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";
import {
	isTrainingInProgress,
	getPrograms,
	getProgramByName,
	saveCurrentWorkout
} from "../services/workout-service";
import {
	EyeOutlined,
	PlusCircleTwoTone,
	InfoCircleOutlined,
} from "@ant-design/icons";

const styles = {
	container: {
		padding: "16px",
	},
	templateCard: {
		backgroundColor: "#1a1a1a",
		color: "#00ff00",
		border: "1px solid #00ff00",
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
	const programs = getPrograms();

	const openProgram = (name) => {
		// TODO: Check that current not exists. if do, open modal and ask to rewrite current workout
		const program = getProgramByName(name)
		saveCurrentWorkout({ name: program.name, exercises: [...program.exercises] })
		navigate("/workout/current")
	}

	return (
		<div style={styles.container}>
			<Flex gap="large" horizontal="true">
				<Button
					icon={<EyeOutlined />}
					type="primary"
					size="large"
					className="mainButton"
					style={styles.historyButton}
					onClick={() => navigate("/workouts")}
				>
					История
				</Button>

				{isTrainingInProgress() ? (
					<Button
						icon={<InfoCircleOutlined />}
						size="large"
						className="mainButton"
						style={styles.currentWorkoutButton}
						onClick={() => navigate("/workout/current")}
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
					>
						Новая тренировка
					</Button>
				)}
			</Flex>

			<Title level={4}>Programs</Title>
			<div>
				{programs.map((program, idx) => (
					<Card
						key={idx}
						style={styles.templateCard}
						onClick={() => openProgram(program.name)}
					>
						{program.name}
					</Card>
				))}
			</div>
		</div>
	);
};
