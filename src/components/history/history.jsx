import { Workouts } from "./workouts";

export const History = ({ workouts }) => {
	return (
		<div style={{ padding: "6px" }}>
			<h2 level={1} style={{ textAlign: "center" }}>
				Past Workouts
			</h2>
			<Workouts workouts={workouts} />
		</div>
	);
};
