import { Grid } from "antd-mobile";
import { ExercisesView } from "./exercises-view";
import "./style.css";
import { ClockCircleOutline } from "antd-mobile-icons";

export const Workout = ({ workout }) => {
	const durationOfWorkout = () => {
		let timeDifference = new Date(workout.finishTime - workout.startTime); //finishTime - startTime;
		let hours = Math.floor(timeDifference / 3600000);
		let minutes = Math.round((timeDifference % 3600000) / 60000);

		return (
			<Grid columns={5} className="datetime">
				<Grid.Item span="1">
				<ClockCircleOutline />
				</Grid.Item>
				<Grid.Item span="4">
					<span>
						{hours < 1 ? <></> : hours + "h"} {minutes}m
					</span>
				</Grid.Item>
			</Grid>
		);
	};

	return (
		<Grid columns={1} className="workout-vertical-gap">
			<Grid columns={5}>
				<Grid.Item>Wed, 2</Grid.Item>
				<Grid.Item>{durationOfWorkout()}</Grid.Item>
				<Grid.Item span={3}>
					<div>{workout.name}</div>
				</Grid.Item>
			</Grid>
			<ExercisesView exercises={workout.exercises} />
		</Grid>
	);
};
