import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Workout } from '../components/workout';
import {
    getCurrentWorkout,
    removeCurrentWorkout,
    saveCurrentWorkout,
    saveWorkout,
    getById,
    saveProgram
} from '../services/workout-service';

export const WorkoutPage = () => {
    const navigate = useNavigate();
    const { id } = useParams()
    const [workout, setWorkout] = useState({ name: '', exercises: [], startTime: Date.now() })

    useEffect(() => {
        if (id === 'current') {
            setWorkout(getCurrentWorkout())
        }
        else if (id) {
            setWorkout(getById(id))
        }
    }, [id])

    return (
        <Workout workout={workout}
            onUpdate={(workoutUpdated) => {
                const newWorkout = { ...workoutUpdated, startTime: workout.startTime }
                setWorkout(newWorkout)
                saveCurrentWorkout(newWorkout)
            }}
            onFinish={() => {
                removeCurrentWorkout()
                saveWorkout({ ...workout, finishTime: Date.now() })
                navigate("/")
            }}
            onSaveAsProgram={(program) => {
                saveProgram(program)
            }}
        />
    );
};
