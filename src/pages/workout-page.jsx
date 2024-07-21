import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WorkoutEdit } from '../components/workout-edit';
import {
    getCurrentWorkout,
    removeCurrentWorkout,
    saveCurrentWorkout,
    saveWorkout
} from '../services/workout-service';

export const WorkoutPage = ({ loadCurrent = false }) => {
    const navigate = useNavigate();
    const [workout, setWorkout] = useState({ name: '', exercises: [], startTime: null })

    useState(() => {
        if (loadCurrent) {
            setWorkout(getCurrentWorkout())
        }
    }, [])

    return (
        <WorkoutEdit
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
