import { useState } from "react";
import { Program } from "../../services/program-service";
import { ErrorBlock } from "antd-mobile";
import { CompletedExcercise } from "./exercise-player";
import { Timer } from "../timer";
import { VBoxContainer } from "../shared/vbox-container";
import { ExercisesPlayer } from "./exercises-player";
import "./style.css";

export const WorkoutPlayer = ({
	program,
	onFinish,
}: {
	program: Program;
	onFinish: (workout: any) => void;
}) => {
	const [startTime] = useState<number>(Date.now());

	const handleOnFinish = (completedExercises: CompletedExcercise[]) => {
		onFinish({
			name: program.name,
			exercises: completedExercises.filter((ex, _) => ex.sets.length > 0),
			startTime,
			finishTime: Date.now(),
		});
	};

	return (
		<>
			{program.exercises.length > 0 ? (
				<VBoxContainer
					alignItems="center"
					childStyle={{
						width: "100%",
						textAlign: "center",
					}}
				>
					<span style={{ fontSize: "52px" }}>{program.name}</span>
					<Timer fontSize="64px" startTime={new Date(startTime)} />
					<ExercisesPlayer
						exercises={program.exercises}
						onFinish={handleOnFinish}
					/>
				</VBoxContainer>
			) : (
				<ErrorBlock
					status="empty"
					title="No exercises, update you program please."
					description=""
				/>
			)}
		</>
	);
};
