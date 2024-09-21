import {
	Form,
	Input,
	Button,
	Skeleton,
	Grid,
	Toast,
	Dialog,
} from "antd-mobile";
import { Exercises } from "./exercises";
import { CancelWorkoutButton } from "./cancel-workout-button";

function showValidationFailedMsg() {
	Toast.show({
		icon: "fail",
		position: "top",
		content: "Fill required fields",
		maskClickable: true,
	});
}

export const Workout = ({
	initialWorkout,
	onUpdate,
	onFinish,
	onSaveAsProgram,
	onCancel,
}) => {
	const [formRef] = Form.useForm();

	const saveAsProgram = async () => {
		formRef
			.validateFields()
			.then(() => {
				onSaveAsProgram();
			})
			.catch(() => showValidationFailedMsg());
	};

	const handleOnFinish = (workout) => {
		onFinish({
			name: workout.name.trim(),
			exercises:
				workout.exercises?.map((e) => ({
					name: e.name.trim(),
					sets: e.sets ? [...e.sets] : [],
				})) || [],
		});
	};

	if (initialWorkout === null) {
		return (
			<>
				<Skeleton.Title animated />
				<Skeleton.Paragraph lineCount={5} animated />
			</>
		);
	}

	return (
		<Form
			form={formRef}
			initialValues={initialWorkout}
			onFinish={handleOnFinish}
			name="workout_form"
			onValuesChange={(_, v) => onUpdate(v)}
			mode="card"
		>
			<Grid columns={4}>
				<Grid.Item span={3}>
					<Form.Item
						name={"name"}
						label="Workout name"
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
							placeholder="name"
							onChange={(value) =>
								formRef.setFieldValue("name", value.trim())
							}
						/>
					</Form.Item>
				</Grid.Item>
				<Grid.Item>
					<Form.Item>
						<Button
							block
							color="primary"
							size="middle"
							onClick={async () => {
								try {
									await formRef.validateFields();
								} catch (__1) {
									showValidationFailedMsg();
									return;
								}

								await Dialog.confirm({
									title: "Save workout?",
									onConfirm: () => formRef.submit(),
								});
							}}
						>
							Save
						</Button>
					</Form.Item>
				</Grid.Item>
			</Grid>
			<Exercises formRef={formRef} />
			<Button
				size="middle"
				block
				fill="outline"
				style={{ display: "block", margin: "16px auto" }}
				onClick={saveAsProgram}
			>
				Save as Program
			</Button>
			<CancelWorkoutButton onClick={onCancel} />
		</Form>
	);
};
