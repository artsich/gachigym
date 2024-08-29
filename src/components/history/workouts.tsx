import { Divider, Grid } from "antd-mobile";
import "./style.css";
import { Workout } from "./workout";
import { useEffect, useState } from "react";
import { getWorkouts, removeWorkout } from "../../services/workout-service";

export const Workouts = () => {
	const [workouts, setWorkouts] = useState<[]>([]);

	const reload = () => {
		setWorkouts(getWorkouts());
	};

	useEffect(() => {
		reload();
	}, []);

	return (
		<Grid columns={1} className="history-vertical-gap">
			{workouts.map((workout, index) => (
				<div key={index}>
					<Grid.Item>
						<Workout
							workout={workout}
							onRemoveOne={(id: string) => {
								removeWorkout(id);
								reload();
							}}
						/>
					</Grid.Item>
					<Divider />
				</div>
			))}
		</Grid>
	);
};
