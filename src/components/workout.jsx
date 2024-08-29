import { Form, Input, Button, Skeleton, Grid, Toast } from "antd-mobile";
import { Exercises } from "./exercises";
import { FinishTrainingButton } from "./finish-training-button";
import { CancelWorkoutButton } from "./cancel-workout-button";
import { Timer } from "./timer";

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
	onStart,
	onFinish,
	onSaveAsProgram,
	onCancel,
}) => {
	const [formRef] = Form.useForm();
	const started = initialWorkout?.startTime !== undefined;

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
						<Input placeholder="name" />
					</Form.Item>
				</Grid.Item>
				<Grid.Item>
					<Form.Item>
						{started ? (
							<FinishTrainingButton
								onBeforeFinish={async () => {
									try {
										await formRef.validateFields();
										return true;
									} catch (__1) {
										showValidationFailedMsg();
										return false;
									}
								}}
								onFinish={() => formRef.submit()}
							/>
						) : (
							<Button
								block
								color="primary"
								size="middle"
								onClick={onStart}
							>
								Start
							</Button>
						)}
					</Form.Item>
				</Grid.Item>
			</Grid>
			<Form.Item>
				{initialWorkout.startTime && (
					<div
						style={{
							marginTop: "8px",
							display: "flex",
							justifyContent: "center",
						}}
					>
						<Timer startTime={initialWorkout.startTime} />
					</div>
				)}
			</Form.Item>
			<Exercises />
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
