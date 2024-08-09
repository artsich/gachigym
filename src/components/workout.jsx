import React, { useEffect } from 'react';
import { Form, Input, Col, Row, Button } from 'antd';
import { Exercises } from './exercises';
import { FinishTrainingButton } from './finish-training-button';
import { CancelWorkoutButton } from './cancel-workout-button';
import { Timer } from './timer';

export const Workout = ({ workout, onUpdate, onStart, onFinish, onSaveAsProgram, onCancel }) => {
	const [form] = Form.useForm()
	const started = workout.startTime !== undefined

	useEffect(() => {
		form.setFieldsValue(workout)
	}, [form, workout])

	const saveAsProgram = async () => {
		try {
			await form.validateFields();
			// TODO: maybe better this logic to service. (Logic to copy only name and exercises)
			onSaveAsProgram({ name: workout.name, exercises: [...workout.exercises] })
		} catch (__1) {
		}
	}

	return (
		<Form
			form={form}
			name="workout_form"
			onFinish={onFinish}
			onValuesChange={(_, v) => onUpdate(v)}
			autoComplete="off"
			style={{ padding: '16px' }}
		>
			<Row gutter={[16, 16]} align="middle" justify="space-between">
				<Col flex="auto">
					<Form.Item
						name="name"
						noStyle
						rules={[{ required: true, message: 'Please input the workout name!' }]}
					>
						<Input placeholder="Workout Name" />
					</Form.Item>
				</Col>
				<Col>
					{
						started ?
							<FinishTrainingButton onBeforeFinish={async () => {
								try {
									await form.validateFields();
									return true;
								} catch (__1) {
									return false;
								}
							}} onFinish={() => form.submit()} />
							:
							<Button size="middle" onClick={onStart}>Start</Button>
					}
				</Col>
			</Row>
			{
				workout.startTime &&
				(
					<div style={{
						marginTop: '16px',
						display: 'flex',
						justifyContent: 'center',
					}}>
						<Timer startTime={workout.startTime} />
					</div>
				)
			}
			<Exercises />
			<Button size="large" block type='dashed' style={{ display: 'block', margin: '16px auto' }} onClick={saveAsProgram}>Save as Program</Button>
			{
				// todo: Aboty shoule be available when workout started!
			}
			<CancelWorkoutButton onClick={onCancel} />
		</Form >
	);
};
