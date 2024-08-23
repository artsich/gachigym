import { Divider, Grid } from "antd-mobile";
import "./style.css";
import { Workout } from "./workout";

export const Workouts = ({ workouts }: { workouts: [any] }) => (
	<Grid columns={1} className="history-vertical-gap">
		{workouts.map((workout: any, index: number) => (
			<div key={index}>
				<Grid.Item>
					<Workout workout={workout} />
				</Grid.Item>
				<Divider />
			</div>
		))}
	</Grid>
);
