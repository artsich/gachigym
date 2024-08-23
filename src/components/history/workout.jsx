import { AutoCenter, Grid, Space, Tag } from "antd-mobile";
import { ExercisesView } from "./exercises-view";
import "./style.css";
import { ClockCircleOutline } from "antd-mobile-icons";
import { useState } from "react";

export const Workout = ({ workout }) => {
	const [savedAsProgram, setsavedAsProgram] = useState(false);

	const durationOfWorkout = () => {
		let timeDifference = new Date(workout.finishTime - workout.startTime);
		let hours = Math.floor(timeDifference / 3600000);
		let minutes = Math.round((timeDifference % 3600000) / 60000);

		return (
			<AutoCenter>
				<Tag round="true" className="workout-duration">
					<ClockCircleOutline />
					<span>
						{hours < 1 ? <></> : hours + "h"} {minutes}m
					</span>
				</Tag>
			</AutoCenter>
		);
	};

	var dateOptions = {
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
				<Grid.Item span={2}>{durationOfWorkout()}</Grid.Item>
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
