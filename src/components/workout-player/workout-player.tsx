import { useState } from "react";
import { Program, ProgramExcercise } from "../../services/program-service";
import { ErrorBlock, Space } from "antd-mobile";
import { CompletedExcercise, ExercisePlayer } from "./exercise-player";
import { Timer } from "../timer";

export const WorkoutPlayer = ({
	program,
	onFinish,
}: {
	program: Program;
	onFinish: (workout: any) => void;
}) => {
	const [startTime] = useState<number>(Date.now());
	const [completedExercises, setCompletedExercises] = useState<
		CompletedExcercise[]
	>([]);
	const [currentExercise, setCurrentExercise] = useState<
		ProgramExcercise | undefined
	>(() => {
		if (!program.exercises || program.exercises.length === 0) {
			return undefined;
		}
		return program.exercises[0];
	});

	const fetchExercise = (number: number) => {
		return program.exercises[number];
	};

	const handleNextExercise = (completedExercise: CompletedExcercise) => {
		const newCompletedExercises = [
			...completedExercises,
			completedExercise,
		];
		setCompletedExercises(newCompletedExercises);

		const exNumber = newCompletedExercises.length;
		const isLastExercise = exNumber === program.exercises.length;

		if (isLastExercise) {
			onFinish({
				name: program.name,
				exercises: newCompletedExercises.filter(
					(ex, _) => ex.sets.length > 0
				),
				startTime,
				finishTime: Date.now(),
			});
		} else {
			setCurrentExercise(fetchExercise(exNumber));
		}
	};

	return (
		<>
			{currentExercise ? (
				<Space align="center" block direction="vertical">
					<h1>{program.name}</h1>
					<Space direction="vertical" block align="center">
						<Timer startTime={new Date(startTime)} />
						<ExercisePlayer
							exercise={currentExercise}
							onFinished={handleNextExercise}
						/>
					</Space>
				</Space>
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
