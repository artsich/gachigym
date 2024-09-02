import { useEffect, useState } from "react";
import {
	ProgramExcercise,
	Set as ProgramSet,
} from "../../services/program-service";
import { Button, Dialog, Grid, Space } from "antd-mobile";
import { ConfirmCompletedSet } from "./confirm-completed-set";

export type CompletedExcercise = ProgramExcercise;

export const ExercisePlayer = ({
	exercise,
	onFinished,
}: {
	exercise: ProgramExcercise;
	onFinished: (completedExcercise: CompletedExcercise) => void;
}) => {
	const [completedSets, setCompletedSets] = useState<ProgramSet[]>([]);
	const [completedCount, setCompletedCount] = useState<number>(0);
	const [currentSet, setCurrentSet] = useState<ProgramSet>({
		reps: 0,
		weight: 0,
	});

	useEffect(() => {
		setCompletedSets([]);
		setCompletedCount(0);
		setCurrentSet(() => {
			if (exercise.sets.length > 0) {
				return exercise.sets[0];
			}
			return { reps: 0, weight: 0 };
		});
	}, [exercise]);

	const addCompletedSet = (set: ProgramSet) => {
		const newCompletedSets = [...completedSets, set];
		setCompletedSets(newCompletedSets);

		const newSetNumber = newCompletedSets.length;
		const isLastSet = newSetNumber >= exercise.sets.length;

		if (isLastSet) {
			askToFinish(newCompletedSets);
		} else {
			setCurrentSet(exercise.sets[newSetNumber] ?? {});
			setCompletedCount((prevCount) => prevCount + 1);
		}
	};

	const askToFinish = (sets: ProgramSet[], addNew = true) => {
		Dialog.confirm({
			title: "Finish exercise?",
			cancelText: "Continue",
			onConfirm: () =>
				onFinished({
					name: exercise.name,
					sets,
				}),
			onCancel: () => {
				if (addNew) {
					setCurrentSet({ reps: 0, weight: 0 });
					setCompletedCount((prevCount) => prevCount + 1);
				}
			},
		});
	};

	return (
		<Grid columns={1} gap={20}>
			<Grid.Item>
				<Space justify="center" block>
					<h2>
						{exercise.name}: {completedCount + 1} /{" "}
						{exercise.sets.length}
					</h2>
				</Space>
			</Grid.Item>
			<Grid.Item>
				<Space justify="center" align="center" block>
					<span
						style={{
							height: 130,
							width: 130,
							backgroundColor: "red",
							borderRadius: "50%",
							display: "inline-flex",
							alignItems: "center",
							justifyContent: "center",
							fontSize: "24px",
							color: "#fff",
						}}
					>
						{!currentSet.reps && !currentSet.weight
							? "?"
							: `${currentSet.reps}` +
							  (currentSet.weight > 0
									? ` x ${currentSet.weight} kg`
									: "")}
					</span>
				</Space>
			</Grid.Item>
			<Grid.Item>
				<Grid columns={2} gap={20}>
					<Grid.Item>
						<Button
							block
							color="success"
							fill="outline"
							onClick={() => askToFinish(completedSets, false)}
						>
							Finish exercise
						</Button>
					</Grid.Item>
					<Grid.Item>
						<ConfirmCompletedSet
							set={currentSet}
							onDone={(set) => addCompletedSet(set)}
						/>
					</Grid.Item>
				</Grid>
			</Grid.Item>
		</Grid>
	);
};
