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
			<Grid columns={5} gap={8}>
				<Grid.Item span={1}>
					<Form.Item
						name={[field.index, "isDone"]}
						valuePropName="checked"
					>
						<Switch
							style={{
								"--checked-color": "#00b578",
								marginTop: "8px",
							}}
						/>
					</Form.Item>
				</Grid.Item>
				<Grid.Item span={2}>
					<Form.Item name={[field.index, "weight"]} label="Weight">
						<Input
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
						rules={[{ required: true, message: "Missing value" }]}
					>
						<Input
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
