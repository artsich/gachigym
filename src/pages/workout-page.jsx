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
import { Toast } from 'antd-mobile';
import { Exercises } from '../components/exercises';

export const WorkoutPage = () => {
	const navigate = useNavigate();
	const { id } = useParams()
	const [workout, setWorkout] = useState(null)

	useEffect(() => {
		if (id === 'current') {
			setWorkout(getCurrentWorkout())
		}
		else if (id) {
			setWorkout(getById(id))
		}
		else {
			setWorkout({ name: '', exercises: [] })
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
				saveCurrentWorkout(newWorkout)
				setWorkout(newWorkout)
			}}
			onFinish={() => {
				removeCurrentWorkout()
				saveWorkout({ ...workout, finishTime: Date.now() })
				navigateToMain()
			}}
			onSaveAsProgram={(program) => {
				if (!getProgramByName(program.name)) {
					saveProgram(program)
					Toast.show({
						icon: 'success',
						content: `${program.name} is saved`,
					})
				}
				else {
					Toast.show({
						icon: 'fail',
						content: `Program '${program.name}' already exists`,
					})
				}
			}}
			onCancel={() => {
				removeCurrentWorkout()
				navigateToMain()
			}}
		/>
	);
};
