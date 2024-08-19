import { CapsuleTabs, Grid } from "antd-mobile";

export const ExercisesView = ({ exercises }) => {
	return (
		<CapsuleTabs defaultActiveKey="0">
			{exercises?.map((exercise, index) => (
				<CapsuleTabs.Tab title={exercise.name} key={index}>
					<Grid columns={5} gap={35}>
						{exercise.sets?.map((set, ind2) => (
							<Grid.Item key={ind2}>
								<div className="badge">
									<div className="badge-weight">
										{set.weight}
									</div>
									<div className="badge-reps">{set.reps}</div>
									<div className="badge-label-KG">KG</div>
								</div>
							</Grid.Item>
						))}
					</Grid>
				</CapsuleTabs.Tab>
			))}
		</CapsuleTabs>
	);
};
