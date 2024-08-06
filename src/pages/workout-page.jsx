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
import { message } from 'antd';

export const WorkoutPage = () => {
    const navigate = useNavigate();
    const { id } = useParams()
    const [workout, setWorkout] = useState({ name: '', exercises: [] })

    useEffect(() => {
        if (id === 'current') {
            setWorkout(getCurrentWorkout())
        }
        else if (id) {
            setWorkout(getById(id))
        }
    }, [id])

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
                navigate("/")
            }}
            onSaveAsProgram={(program) => {
                if (!getProgramByName(program.name)) {
                    saveProgram(program)
                    message.success(`${program.name} is saved`)
                }
                else {
                    // TODO: Find something user friendly.
                    message.error(`Program '${program.name}' already exists`)
                }
            }}
            onAbort={() => {
                removeCurrentWorkout()
                navigate("/")
            }}
        />
    );
};
