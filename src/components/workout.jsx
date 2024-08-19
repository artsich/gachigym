import { Form, Input, Button, Skeleton, Grid } from "antd-mobile";
import { Exercises } from "./exercises";
import { FinishTrainingButton } from "./finish-training-button";
import { CancelWorkoutButton } from "./cancel-workout-button";
import { Timer } from "./timer";

export const Workout = ({
	workout,
	onUpdate,
	onStart,
	onFinish,
	onSaveAsProgram,
	onCancel,
}) => {
	const [formRef] = Form.useForm();
	const started = workout?.startTime !== undefined;

	const saveAsProgram = async () => {
		try {
			await formRef.validateFields();
			onSaveAsProgram({
				name: workout.name.trim(),
				exercises: workout.exercises?.map((e) => ({
					name: e.name.trim(),
					sets: e.sets?.map((s) => ({
						weight: s.weight,
						reps: s.reps,
					})),
				})),
			});
		} catch (e) {
			console.error("catch", e);
		}
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

	if (workout === null) {
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
			initialValues={workout}
			onFinish={handleOnFinish}
			name="workout_form"
			onValuesChange={(_, v) => onUpdate(v)}
			style={{ padding: "16px" }}
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
				{workout.startTime && (
					<div
						style={{
							marginTop: "8px",
							display: "flex",
							justifyContent: "center",
						}}
					>
						<Timer startTime={workout.startTime} />
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
