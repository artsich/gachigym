import { AutoCenter, Grid, Space, Tag } from "antd-mobile";
import { ExercisesView } from "./exercises-view";
import { ClockCircleOutline } from "antd-mobile-icons";
import "./style.css";

function calculateDuration(startTime, finishTime) {
	const timeDifference = new Date(finishTime - startTime);
	const hours = Math.floor(timeDifference / 3600000);
	const minutes = Math.round((timeDifference % 3600000) / 60000);

	return `${hours <= 1 ? "" : hours + "h"} ${minutes}m`;
}

const WorkoutDuration = ({ startTime, finishTime }) => {
	return (
		<AutoCenter>
			<Tag round="true" className="workout-duration">
				<ClockCircleOutline />
				<span>{calculateDuration(startTime, finishTime)}</span>
			</Tag>
		</AutoCenter>
	);
};

export const Workout = ({ workout }) => {
	const dateOptions = {
		weekday: "short",
		day: "numeric",
		month: "short",
	};

	return (
		<Grid columns={1} className="workout-vertical-gap">
			<Grid columns={8} className="workout-header">
				<Grid.Item span={2}>
					<Tag round="true" className="date-time">
						{new Date(workout.startTime).toLocaleString(
							"en-US",
							dateOptions
						)}
					</Tag>
				</Grid.Item>
				<Grid.Item span={2}>
					<WorkoutDuration
						startTime={workout.startTime}
						finishTime={workout.finishTime}
					/>
				</Grid.Item>
				<Grid.Item span={4}>
					<Space justify="center" block="true">
						<Tag round="true" className="workout-name">
							{workout.name}
						</Tag>
					</Space>
				</Grid.Item>
			</Grid>
			<ExercisesView exercises={workout.exercises} />
		</Grid>
	);
};
