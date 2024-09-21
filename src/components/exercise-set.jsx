import { Input, Switch, Form, SwipeAction, Grid } from "antd-mobile";

export const ExerciseSet = ({ field, onRemoveSet }) => {
	return (
		<SwipeAction
			key={field.index}
			closeOnAction={true}
			closeOnTouchOutside={true}
			rightActions={[
				{
					key: "delete",
					text: "Delete",
					color: "danger",
					onClick: () => {
						onRemoveSet();
					},
				},
			]}
		>
			<Grid columns={4}>
				<Grid.Item span={2}>
					<Form.Item name={[field.index, "weight"]} label="Weight">
						<Input
							inputMode="numeric"
							type="number"
							placeholder="..."
							clearable
							min={0}
							max={1000}
						/>
					</Form.Item>
				</Grid.Item>
				<Grid.Item span={2}>
					<Form.Item
						name={[field.index, "reps"]}
						label="Reps"
						rules={[
							{
								required: true,
								message: "Missed",
							},
						]}
					>
						<Input
							inputMode="numeric"
							type="number"
							placeholder="..."
							clearable
							min={0}
							max={1000}
						/>
					</Form.Item>
				</Grid.Item>
			</Grid>
		</SwipeAction>
	);
};
