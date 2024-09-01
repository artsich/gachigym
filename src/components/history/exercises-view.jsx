import { Grid, Space, Tag } from "antd-mobile";
import { useState } from "react";
import { SetBadge } from "./set-badge";

export const ExercisesView = ({ exercises }) => {
	const [activeExercise, setActiveExercise] = useState(0);

	return (
		<Grid columns={1} gap={20}>
			<Grid.Item>
				<Space wrap>
					{exercises?.map((exercise, index) => (
						<Tag
							key={index}
							fill={
								activeExercise === index ? "solid" : "outline"
							}
							color={
								activeExercise === index ? "success" : "default"
							}
							onClick={() => setActiveExercise(index)}
							style={{ fontSize: "14px" }}
						>
							{exercise.name}
						</Tag>
					))}
				</Space>
			</Grid.Item>
			<Grid.Item>
				<Grid columns={6} gap={16}>
					{exercises.length ? (
						exercises[activeExercise].sets?.map((set, ind2) => (
							<Grid.Item key={ind2}>
								<SetBadge
									weight={set.weight ?? 0}
									reps={set.reps ?? 0}
								/>
							</Grid.Item>
						))
					) : (
						<div></div>
					)}
				</Grid>
			</Grid.Item>
		</Grid>
	);
};
