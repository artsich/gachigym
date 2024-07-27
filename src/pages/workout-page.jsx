import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Workout } from '../components/workout';
import {
    getCurrentWorkout,
    removeCurrentWorkout,
    saveCurrentWorkout,
    saveWorkout,
    getById
} from '../services/workout-service';

export const WorkoutPage = () => {
    const navigate = useNavigate();
    const { id } = useParams()
    const [workout, setWorkout] = useState({ name: '', exercises: [], isProgram: false, startTime: null })

    useState(() => {
        if (id === 'current') {
            setWorkout(getCurrentWorkout())
        }
        else if (id) {
            setWorkout(getById(id))
        }
    }, [])

    return (
        <Workout
            workout={workout}
            onUpdate={(workout) => {
                setWorkout(workout)
                saveCurrentWorkout(workout)
            }}
            onFinish={() => {
                removeCurrentWorkout()
                saveWorkout({ ...workout, finishTime: Date.now() })
                navigate("/")
            }}
        />
    );
};
