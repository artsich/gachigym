import { Grid, Popover, Space, Tag } from "antd-mobile";
import { WorkoutDuration } from "./workout-duration";
import { ExercisesView } from "./exercises-view";
import { WorkoutActions } from "./workout-actions";
import { deleteProgram, saveAsProgram } from "../../services/program-service";
import "./style.css";

const truncateName = (name, maxLen) =>
	name.length > maxLen ? name.substring(0, maxLen) + "..." : name;

export const Workout = ({ workout, onRemoveOne }) => {
	const dateOptions = {
		weekday: "short",
		day: "numeric",
		month: "short",
	};

	return (
		<Grid columns={1} className="workout-vertical-gap">
			<Grid columns={10} className="workout-header">
				<Grid.Item span={2}>
					<Tag round="true" className="date-time">
						{new Date(workout.startTime).toLocaleString(
							"en-US",
							dateOptions
						)}
					</Tag>
				</Grid.Item>
				<Grid.Item span={2}>
					<Space justify="start">
						<WorkoutDuration
							startTime={workout.startTime}
							finishTime={workout.finishTime}
						/>
					</Space>
				</Grid.Item>
				<Grid.Item span={5}>
					<Space justify="start" block="true">
						<Popover
							content={workout.name}
							trigger="click"
							placement="bottom"
						>
							<Tag
								round="true"
								className="workout-name"
								onClick={() => console.log(1)}
							>
								{truncateName(workout.name, 26)}
							</Tag>
						</Popover>
					</Space>
				</Grid.Item>
				<WorkoutActions
					span={1}
					workout={workout}
					onRemove={() => {
						onRemoveOne(workout.id);
					}}
					onSaveProgram={() => {
						saveAsProgram(workout);
					}}
					onDeleteProgram={() => {
						deleteProgram(workout.name);
					}}
				/>
			</Grid>
			<ExercisesView exercises={workout.exercises} />
		</Grid>
	);
};
