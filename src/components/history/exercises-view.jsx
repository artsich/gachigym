import { Grid, Space, Tag } from "antd-mobile";
import { useState } from "react";

export const ExercisesView = ({ exercises }) => {
	const [activeExercise, setActiveExercise] = useState(0);

	return (
		<Grid columns={1} gap={20}>
			<Grid.Item>
				<Space>
					{exercises?.map((exercise, index) => (
						<Tag
							key={index}
							fill={
								activeExercise === index ? "solid" : "outline"
							}
							color={
								activeExercise === index ? "warning" : "default"
							}
							onClick={() => setActiveExercise(index)}
							style={{fontSize: "14px"}}
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
								<div className="badge">
									<div className="badge-weight">
										{set.weight}
									</div>
									<div className="badge-reps">{set.reps}</div>
									<div className="badge-label-KG">KG</div>
								</div>
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
