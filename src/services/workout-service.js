import { generateId } from './id-generator'

const WORKOUTS_STORAGE_KEY = 'trainings'

export function isTrainingInProgress() {
    return localStorage.getItem('current_workout') !== null
}

export function removeCurrentWorkout() {
    localStorage.removeItem('current_workout')
}

export function getCurrentWorkout() {
    const currentWorkout = localStorage.getItem('current_workout')
    if (currentWorkout) {
        return JSON.parse(currentWorkout)
    }

    return { name: '', exercises: [] }
}

export function saveCurrentWorkout(workout) {
    localStorage.setItem('current_workout', JSON.stringify(workout))
}

export function saveWorkout(workout) {
    const newWorkout = { ...workout, id: generateId() }
    let workouts = getWorkouts()
    workouts.push(newWorkout)
    localStorage.setItem(WORKOUTS_STORAGE_KEY, JSON.stringify(workouts))
}

export function getWorkouts() {
    const trainings = JSON.parse(localStorage.getItem(WORKOUTS_STORAGE_KEY)) ?? []
    const sorted = trainings.sort((a, b) => b.startTime - a.startTime)
    return sorted
}

export function getById(id) {
    return getWorkouts().find(w => w.id === id)
}

export function removeWorkout(id) {
    const workouts = getWorkouts().filter(workout => workout.id != id)
    localStorage.setItem(WORKOUTS_STORAGE_KEY, JSON.stringify(workouts))
}