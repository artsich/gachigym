import { AutoCenter, Grid, Space, Tag } from "antd-mobile";
import { useState } from "react";
import { SetBadge } from "./set-badge";
import { InformationCircleFill } from "antd-mobile-icons";
import { ThemedPopover } from "../shared/themed-popover";

function getSetsInformation(sets) {
	const tonnage =
		sets?.reduce(
			(tonnage, set) =>
				tonnage + Number(set.weight || 0) * Number(set.reps || 0),
			0
		) ?? 0;

	const reps =
		sets?.reduce(
			(summaryReps, set) => summaryReps + Number(set.reps || 0),
			0
		) ?? 0;

	if (tonnage === 0) {
		return `${reps} reps`;
	} else {
		return `Tonnage: ${tonnage} kg for ${reps} reps`;
	}
}

const ExerciseSummary = ({ exercise }) => {
	const sets = exercise?.sets;
	if (!sets) {
		return <></>;
	}

	return (
		<AutoCenter>
			<ThemedPopover
				content={getSetsInformation(sets)}
				trigger="click"
				placement="bottom"
			>
				<InformationCircleFill fontSize={20} />
			</ThemedPopover>
		</AutoCenter>
	);
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
							round={true}
							fill={
								activeExercise === index ? "solid" : "outline"
							}
							color={
								activeExercise === index ? "success" : "default"
							}
							onClick={() => setActiveExercise(index)}
							style={{ fontSize: "14px", padding: "6px 14px" }}
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
						<ExerciseSummary exercise={exercises[activeExercise]} />
					</Grid.Item>
				</Grid>
			</Grid.Item>
		</Grid>
	);
};
