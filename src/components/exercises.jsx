import { Form, Input, Divider, SwipeAction, Dialog } from "antd-mobile";
import { AddCircleOutline } from "antd-mobile-icons";
import { ExerciseSet } from "./exercise-set";

export const Exercises = ({ formRef }) => {
	return (
		<Form.Array
			name="exercises"
			renderAdd={() => (
				<span>
					<AddCircleOutline /> Add exercise
				</span>
			)}
		>
			{(fields, { remove }) =>
				fields.map(({ index }) => (
					<>
						<SwipeAction
							key={index}
							closeOnAction={true}
							closeOnTouchOutside={true}
							rightActions={[
								{
									key: "delete",
									text: "Delete",
									color: "danger",
									onClick: () => {
										Dialog.confirm({
											title: "Remove excercise?",
											onConfirm: () => remove(index),
										});
									},
								},
							]}
						>
							<Form.Item
								name={[index, "name"]}
								rules={[
									{
										required: true,
										message: "Name is required!",
									},
									{
										type: "string",
										min: 2,
										message: "Too short",
									},
									{
										type: "string",
										max: 100,
										message: "Too long",
									},
								]}
							>
								<Input
									style={{ "--font-size": "24px" }}
									placeholder="Exercise name"
									onChange={(value) => {
										// todo: by some reason it does not work, but for workout name it is fine.
										// WHY???
										formRef.setFieldValue(
											[index, "name"],
											value.trim()
										);
									}}
								/>
							</Form.Item>
						</SwipeAction>
						<Divider />
						<Form.Array
							name={[index, "sets"]}
							renderAdd={() => (
								<span>
									<AddCircleOutline /> Add set
								</span>
							)}
						>
							{(fields, { remove }) =>
								fields.map((field) => (
									<ExerciseSet
										field={field}
										onRemoveSet={() => remove(field.index)}
									/>
								))
							}
						</Form.Array>
					</>
				))
			}
		</Form.Array>
	);
};
