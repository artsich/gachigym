import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Workout } from "../components/workout";
import {
	getCurrentWorkout,
	removeCurrentWorkout,
	saveCurrentWorkout,
	saveWorkout,
	getById,
} from "../services/workout-service";
import { Dialog, Toast } from "antd-mobile";
import {
	Program,
	deleteProgram,
	getProgramByName,
	saveProgram,
} from "../services/program-service";

export const WorkoutPage = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [workout, setWorkout] = useState<any>(null);

	useEffect(() => {
		if (id === "current") {
			setWorkout(getCurrentWorkout());
		} else if (id) {
			setWorkout(getById(id));
		} else {
			setWorkout({ name: "", exercises: [] });
		}
	}, [id]);

	const navigateToMain = () => {
		navigate("/");
	};

	return (
		<Workout
			initialWorkout={workout}
			onUpdate={(workoutUpdated: any) => {
				const newWorkout = {
					...workoutUpdated,
					startTime: workout.startTime,
				};
				saveCurrentWorkout(newWorkout);
				setWorkout(newWorkout);
			}}
			onStart={() => {
				const newWorkout = { ...workout, startTime: Date.now() };
				saveCurrentWorkout(newWorkout);
				setWorkout(newWorkout);
			}}
			onFinish={() => {
				removeCurrentWorkout();
				saveWorkout({ ...workout, finishTime: Date.now() });
				navigateToMain();
			}}
			onSaveAsProgram={(program: Program) => {
				if (!getProgramByName(program.name)) {
					saveProgram(program);
					Toast.show({
						icon: "success",
						content: `${program.name} is saved`,
					});
				} else {
					Dialog.confirm({
						title: `${program.name} already exists, replace?`,
						onConfirm: () => {
							deleteProgram(program.name);
							saveProgram(program);
							Toast.show({
								icon: "success",
								content: `${program.name} is updated`,
							});
						},
					});
				}
			}}
			onCancel={() => {
				//TODO: if workout name is empty and there are not exsercises, just remove it without ask.
				removeCurrentWorkout();
				navigateToMain();
			}}
		/>
	);
};
