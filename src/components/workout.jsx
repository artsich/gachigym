import React, { useEffect } from 'react';
import { Form, Input, Col, Row, Button } from 'antd-mobile';
import { Exercises } from './exercises';
import { FinishTrainingButton } from './finish-training-button';
import { CancelWorkoutButton } from './cancel-workout-button';
import { Timer } from './timer';

export const Workout = ({ workout, onUpdate, onStart, onFinish, onSaveAsProgram, onCancel }) => {
	// const [form] = Form.useForm()
	const started = workout.startTime !== undefined

	// useEffect(() => {
	// 	form.setFieldsValue(workout)
	// }, [form, workout])

	const saveAsProgram = async () => {
		try {
			//await form.validateFields();
			// TODO: maybe better this logic to service. (Logic to copy only name and exercises)
			//onSaveAsProgram({ name: workout.name, exercises: [...workout.exercises] })
		} catch (__1) {
		}
	}

	return (
		<Form
			initialValues={workout}
			name="workout_form"
			onValuesChange={(_, v) => onUpdate(v)}
			style={{ padding: '16px' }}
			footer={
				started ?
					<FinishTrainingButton
						onBeforeFinish={async () => {
							try {
								//await form.validateFields();
								return true;
							} catch (__1) {
								return false;
							}
						}}
						onFinish={() => /*form.submit()*/ { }} />
					:
					<Button block color='primary' size="middle" onClick={onStart}>Start</Button>
			}
		>
			<Form.Item
				name={'name'}
				label='Workout name'
				rules={[{ required: true, message: 'Name is required!' }]}
			>
				<Input placeholder='name' />
			</Form.Item>

			<Form.Item>
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
			</Form.Item>

			<Exercises />
			<Button size="middle" block fill='outline' style={{ display: 'block', margin: '16px auto' }} onClick={saveAsProgram}>Save as Program</Button>
			{
				// todo: Aboty shoule be available when workout started!
			}
			<CancelWorkoutButton onClick={onCancel} />
		</Form >
	);
};
