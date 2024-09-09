import { Divider, Grid } from "antd-mobile";
import { Workout } from "./workout";
import "./style.css";

export const Workouts = ({
	workouts,
	onRemove,
}: {
	workouts: any[];
	onRemove: (id: string) => void;
}) => {
	return (
		<Grid columns={1} className="history-vertical-gap">
			{workouts.map((workout, index) => (
				<div key={index}>
					<Grid.Item>
						<Workout workout={workout} onRemoveOne={onRemove} />
					</Grid.Item>
					<Divider />
				</div>
			))}
		</Grid>
	);
};
