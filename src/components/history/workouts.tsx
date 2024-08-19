import { List } from "antd-mobile";
import { Workout } from "./workout";

export const Workouts = ({ workouts }: { workouts: [any] }) => (
	<List>
		{workouts.map((workout: any, index: number) => (
			<List.Item key={index}>
				<Workout workout={workout} />
			</List.Item>
		))}
	</List>
);
