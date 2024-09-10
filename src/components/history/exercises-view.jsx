import { Grid, Space, Tag } from "antd-mobile";
import { useState } from "react";
import { SetBadge } from "./set-badge";
import { InformationCircleFill } from "antd-mobile-icons";
import { ThemedPopover } from "../shared/themed-popover";

const getExerciseInformation = (sets) => {
	const tonnage = sets.length
		? sets?.reduce(
				(tonnage, set) => tonnage + (set.weight || 0) * (set.reps || 0),
				0
		  )
		: 0;

	const reps = sets.length
		? sets?.reduce((summaryReps, set) => {
				return summaryReps + set.reps;
		  }, 0)
		: 0;

	return `Tonnage: ${tonnage} kg for ${reps} reps`;
};

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
				<Grid columns={7} gap={4}>
					<Grid.Item span={6}>
						<Grid columns={5} gap={16}>
							{exercises.length ? (
								exercises[activeExercise].sets?.map(
									(set, ind2) => (
										<Grid.Item key={ind2}>
											<SetBadge
												weight={set.weight ?? 0}
												reps={set.reps ?? 0}
											/>
										</Grid.Item>
									)
								)
							) : (
								<div></div>
							)}
						</Grid>
					</Grid.Item>
					<Grid.Item span={1}>
						<AutoCenter>
							<ThemedPopover
								content={getExerciseInformation(
									exercises[activeExercise].sets
								)}
								trigger="click"
								placement="bottom"
							>
								<InformationCircleFill fontSize={20} />
							</ThemedPopover>
						</AutoCenter>
					</Grid.Item>
				</Grid>
			</Grid.Item>
		</Grid>
	);
};
