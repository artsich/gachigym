import { Grid, Space, Tag } from "antd-mobile";
import { WorkoutDuration } from "./workout-duration";
import { ExercisesView } from "./exercises-view";
import { WorkoutActions } from "./workout-actions";
import { deleteProgram, saveAsProgram } from "../../services/program-service";
import { ThemedPopover } from "../shared/themed-popover";
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
			<Grid columns={8} className="workout-header">
				<Grid.Item span={2}>
					<Tag round="true" className="date-time">
						{new Date(workout.startTime).toLocaleString(
							"en-US",
							dateOptions
						)}
					</Tag>
				</Grid.Item>
				<Grid.Item>
					<Space align="center" block>
						<WorkoutDuration
							startTime={workout.startTime}
							finishTime={workout.finishTime}
						/>
					</Space>
				</Grid.Item>
				<Grid.Item span={4}>
					<Space justify="center" block="true">
						<ThemedPopover
							content={workout.name}
							trigger="click"
							placement="bottom"
						>
							{
								//todo: when clicked, text doesn't fit on the screen if width more then screen.width
								// wrap mode should be changed somehow.
							}
							<Tag round="true" className="workout-name">
								{truncateName(workout.name, 15)}
							</Tag>
						</ThemedPopover>
					</Space>
				</Grid.Item>
				<Grid.Item>
					<Space justify="end" block>
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
					</Space>
				</Grid.Item>
			</Grid>
			<ExercisesView exercises={workout.exercises} />
		</Grid>
	);
};
