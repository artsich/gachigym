import { Grid } from "antd-mobile";
import { ExercisesView } from "./exercises-view";
import "./style.css";

export const OldWorkout = ({ workout }) => {
	return (
		<Grid columns={1}>
			<Grid columns={4} gap={18}>
				<Grid.Item span={3}>
					<div>{workout.name}</div>
				</Grid.Item>
				<Grid.Item span={1}>
					<div>
						<span
							style={{
								fontSize: "bold 16px",
							}}
						>
							{new Date(workout.startTime).toLocaleDateString()}
						</span>
						<span
							style={{
								font: "small-caps bold 14px sans-serif",
							}}
						>
							2 H 11 m
						</span>
					</div>
				</Grid.Item>
			</Grid>
			<ExercisesView exercises={workout.exercises} />
		</Grid>
	);
};
