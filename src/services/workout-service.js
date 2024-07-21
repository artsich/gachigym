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
    console.log('Trying to save', workout)

    let trainings = JSON.parse(localStorage.getItem('trainings'))
    if (trainings == null) {
        trainings = []
    }

    trainings.push(workout)
    localStorage.setItem('trainings', JSON.stringify(trainings))
}

export function getWorkouts() {
    return []
}