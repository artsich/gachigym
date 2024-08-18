import { List } from "antd-mobile";
import { getWorkouts } from "../services/workout-service";
import { saveProgram } from "../services/program-service";
import { OldWorkout } from "../components/old-workout/old-workout";

export const HistoryPage = () => {
	const workouts = getWorkouts();

	return (
		<div style={{ padding: "50px" }}>
			<h2 level={1} style={{ textAlign: "center" }}>
				Past Workouts
			</h2>
			<List>
				{workouts.map((workout, index) => (
					<List.Item key={index}>
						<OldWorkout
							workout={workout}
							onSaveAsProgram={(program) => {
								saveProgram(program);
							}}
						/>
					</List.Item>
				))}
			</List>
		</div>
	);
};
