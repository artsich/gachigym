import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Workout } from '../components/workout';
import {
	getCurrentWorkout,
	removeCurrentWorkout,
	saveCurrentWorkout,
	saveWorkout,
	getById,
	saveProgram,
	getProgramByName
} from '../services/workout-service';
// import { message } from 'antd-mobile';

export const WorkoutPage = () => {
	const navigate = useNavigate();
	const { id } = useParams()
	const [workout, setWorkout] = useState(
		{
			name: 'Силовая тренивка',
			exercises:
				[
					{
						name: "Присед",
						sets: [
							{
								weight: 10,
								reps: 20,
								isDone: true
							},
							{
								weight: 10,
								reps: 20,
								isDone: true
							}
						]
					},
					{
						name: "Подтягивания",
						sets: [
							{
								weight: 10,
								reps: 20,
								isDone: true
							},
							{
								weight: 10,
								reps: 20,
								isDone: true
							}
						]
					}
				]
		})

	useEffect(() => {
		if (id === 'current') {
			setWorkout(getCurrentWorkout())
		}
		else if (id) {
			setWorkout(getById(id))
		}
	}, [id])

	const navigateToMain = () => {
		navigate("/")
	}

	return (
		<Workout
			workout={workout}
			onUpdate={(workoutUpdated) => {
				const newWorkout = { ...workoutUpdated, startTime: workout.startTime }
				saveCurrentWorkout(newWorkout)
				setWorkout(newWorkout)
			}}
			onStart={() => {
				const newWorkout = { ...workout, startTime: Date.now() }
				setWorkout(newWorkout)
				saveCurrentWorkout(newWorkout)
			}}
			onFinish={() => {
				removeCurrentWorkout()
				saveWorkout({ ...workout, finishTime: Date.now() })
				navigateToMain()
			}}
			onSaveAsProgram={(program) => {
				if (!getProgramByName(program.name)) {
					saveProgram(program)
					// message.success(`${program.name} is saved`)
				}
				else {
					// TODO: Find something user friendly.
					// message.error(`Program '${program.name}' already exists`)
				}
			}}
			onCancel={() => {
				removeCurrentWorkout()
				navigateToMain()
			}}
		/>
	);
};
