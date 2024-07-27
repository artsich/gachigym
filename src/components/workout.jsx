import React, { useState } from 'react';
import { Divider, Row, Col, Button, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Exercise } from './exercise';
import { FinishTrainingButton } from './finish-training-button';

export const Workout = ({ workout, onUpdate, onFinish }) => {
	const [started, setStarted] = useState(workout.startTime != null)
	const readonly = Boolean(workout.startTime && workout.finishTime)

	const update = (workout) => {
		if (!readonly) {
			onUpdate(workout)
		}
	}

	const updateWorkoutName = (name) => {
		update({ ...workout, name })
	}

	const updateExercise = (exercise, index) => {
		const newExercises = [...workout.exercises]
		newExercises[index] = exercise
		update({ ...workout, exercises: newExercises })
	}

	const removeExercise = (index) => {
		const newExercises = [...workout.exercises]
		newExercises.splice(index, 1)
		update({ ...workout, exercises: newExercises })

	}
	const addExercise = () => update({ ...workout, exercises: [...workout.exercises, { name: '', sets: [] }] })

	const startTraining = () => {
		setStarted(true)
		update({ ...workout, startTime: Date.now() })
	}

	const finishTraining = () => {
		onFinish()
	}

	return (
		<div style={{ padding: '16px' }}>
			<Row gutter={[16, 16]} align="middle" justify="space-between">
				<Col flex="auto">
					<Input
						placeholder="Training name"
						value={workout.name}
						onChange={(e) => updateWorkoutName(e.target.value)}
					/>
				</Col>
				{!readonly ?
					started ?
						<Col>
							<FinishTrainingButton onFinish={finishTraining} />
						</Col>
						: <Col>
							<Button type="default" onClick={startTraining}>
								Start training
							</Button>
						</Col>
					: <></>}
			</Row>
			<Divider />
			{workout.startTime ? 'Display ellapsed time....' : <></>}
			{
				workout.exercises.map((exercise, idx) => (
					<div key={idx} style={{ marginBottom: '12px' }}>
						<Exercise
							exercise={exercise}
							onUpdate={(exercise) => updateExercise(exercise, idx)}
							onRemove={() => removeExercise(idx)}
						/>
					</div>
				))
			}
			{!readonly && <Button size="large" style={{ display: 'block', margin: '16px auto' }} icon={<PlusOutlined />} onClick={addExercise} />}
			{<Button size="large" type='dashed' style={{ display: 'block', margin: '16px auto' }}>Save as Program</Button>}
		</div >
	)
}
