import React, { useState } from 'react';
import { WorkoutEdit } from '../components/workout-edit';
import {
    getWorkouts,
} from '../services/workout-service';

export const WorkoutsPage = () => {
    const [workouts] = useState(getWorkouts())

    return (
        <></>
    );
};
