import { useState } from "react";
import { Card, Dialog, Grid } from "antd-mobile";
import { ConfirmCompletedSet } from "./confirm-completed-set";
import {
	ProgramExcercise,
	Set as ProgramSet,
} from "../../services/program-service";

export type CompletedExcercise = ProgramExcercise;

export const ExercisePlayer = ({
	exercise,
	onFinish,
}: {
	exercise: ProgramExcercise;
	onFinish: (ex: CompletedExcercise) => void;
}) => {
	const [completedSets, setCompletedSets] = useState<ProgramSet[]>([]);
	const [currentExercise] = useState<ProgramExcercise>(() => ({
		...exercise,
		sets: exercise.sets ? [...exercise.sets] : [],
	}));
	const [currentSet, setCurrentSet] = useState<ProgramSet>(() => {
		if (exercise.sets && exercise.sets.length > 0) {
			return exercise.sets[0];
		}
		return { reps: 0, weight: 0 };
	});

	const askToFinish = (sets: ProgramSet[]) => {
		Dialog.confirm({
			title: "Finish exercise?",
			cancelText: "Continue",
			onConfirm: () => onFinish({ name: currentExercise.name, sets }),
			onCancel: () => setCurrentSet({ reps: 0, weight: 0 }),
		});
	};

	const handleOnCompleteSet = (set: ProgramSet) => {
		const newCompletedSets = [...completedSets, set];
		setCompletedSets(newCompletedSets);

		const isLastSet =
			newCompletedSets.length >= currentExercise.sets.length;

		if (!isLastSet) {
			setCurrentSet(currentExercise.sets[newCompletedSets.length] ?? {});
		} else {
			askToFinish(newCompletedSets);
		}
	};

	return (
		<Grid columns={1}>
			<Grid.Item span={1}>
				<div style={{ padding: "20px" }}>
					<Card
						onClick={() => {}}
						style={{
							borderRadius: "16px",
							background: "#3f4955",
						}}
						title={
							<span
								style={{
									fontSize: "32px",
								}}
							>
								{`${currentExercise.name}: ${
									completedSets.length
								} / ${
									currentExercise.sets &&
									currentExercise.sets.length > 0
										? currentExercise.sets.length
										: completedSets.length + 1
								}`}
							</span>
						}
						headerStyle={{
							display: "flex",
							justifyContent: "center",
						}}
						bodyStyle={{
							fontSize: "32px",
							display: "flex",
							justifyContent: "center",
						}}
					>
						{!currentSet.reps && !currentSet.weight
							? "?"
							: `${currentSet.reps}` +
							  (currentSet.weight > 0
									? ` x ${currentSet.weight} kg`
									: "")}
					</Card>
				</div>
			</Grid.Item>
			<Grid.Item span={1}>
				<div style={{ height: "100px" }}></div>
			</Grid.Item>
			<Grid.Item span={1}>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<ConfirmCompletedSet
						set={currentSet}
						onDone={handleOnCompleteSet}
					/>
				</div>
			</Grid.Item>
		</Grid>
	);
};
