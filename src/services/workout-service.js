import { generateId } from './id-generator'

const WORKOUTS_STORAGE_KEY = 'trainings'
const PROGRAMS_STORAGE_KEY = 'programs'
const CURRENT_WORKOUT_STORAGE_KEY = 'current_workout'

export function isTrainingInProgress() {
    return localStorage.getItem(CURRENT_WORKOUT_STORAGE_KEY) !== null
}

export function removeCurrentWorkout() {
    localStorage.removeItem(CURRENT_WORKOUT_STORAGE_KEY)
}

export function getCurrentWorkout() {
    const currentWorkout = localStorage.getItem(CURRENT_WORKOUT_STORAGE_KEY)
    if (currentWorkout) {
        return JSON.parse(currentWorkout)
    }

    return { name: '', exercises: [] }
}

export function saveCurrentWorkout(workout) {
    localStorage.setItem(CURRENT_WORKOUT_STORAGE_KEY, JSON.stringify(workout))
}

export function saveWorkout(workout) {
    let newWorkout = undefined
    let workouts = getWorkouts()
    if (workout.id === undefined) {
        newWorkout = { ...workout, id: generateId()}
        workouts.push(newWorkout)     
    } else {
        newWorkout = workouts.find(w => w.id === workout.id)
        if (newWorkout === undefined) {
            workouts.push(workout)     
        } else {
            Object.assign(newWorkout, workout)
        }      
    }
    localStorage.setItem(WORKOUTS_STORAGE_KEY, JSON.stringify(workouts))
}

export function getWorkouts() {
    const trainings = JSON.parse(localStorage.getItem(WORKOUTS_STORAGE_KEY)) ?? []
    const sorted = trainings.sort((a, b) => b.startTime - a.startTime)
    return sorted
}

export function saveProgram(program) {
    let programs = getPrograms()
    programs.push(program)
    localStorage.setItem(PROGRAMS_STORAGE_KEY, JSON.stringify(programs))
}

export function getPrograms() {
    return JSON.parse(localStorage.getItem(PROGRAMS_STORAGE_KEY)) ?? []
}

export function getById(id) {
    return getWorkouts().find(w => w.id === id)
}

export function removeWorkout(id) {
    const workouts = getWorkouts().filter(workout => workout.id !== id)
    localStorage.setItem(WORKOUTS_STORAGE_KEY, JSON.stringify(workouts))
}