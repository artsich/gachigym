// __tests__/workoutFunctions.test.js
import {
	isTrainingInProgress,
	removeCurrentWorkout,
	getCurrentWorkout,
	isCurrentWorkoutExist,
	saveCurrentWorkout,
	saveWorkout,
	getWorkouts,
	getById,
	removeWorkout,
} from "./workout-service"; // Replace with the correct path
import { generateId } from "./id-generator";

jest.mock("./id-generator");

describe("Workout Functions", () => {
	beforeEach(() => {
		localStorage.clear();
		jest.clearAllMocks();
	});

	describe("isTrainingInProgress", () => {
		it("should return true if a current workout is in progress", () => {
			localStorage.setItem(
				"current_workout",
				JSON.stringify({ name: "Workout 1" })
			);
			expect(isTrainingInProgress()).toBe(true);
		});

		it("should return false if no workout is in progress", () => {
			expect(isTrainingInProgress()).toBe(false);
		});
	});

	describe("removeCurrentWorkout", () => {
		it("should remove the current workout from localStorage", () => {
			localStorage.setItem(
				"current_workout",
				JSON.stringify({ name: "Workout 1" })
			);
			removeCurrentWorkout();
			expect(localStorage.getItem("current_workout")).toBe(null);
		});
	});

	describe("getCurrentWorkout", () => {
		it("should return the current workout from localStorage", () => {
			const workout = { name: "Workout 1", exercises: [] };
			localStorage.setItem("current_workout", JSON.stringify(workout));
			expect(getCurrentWorkout()).toEqual(workout);
		});

		it("should return a default empty workout object if no current workout is saved", () => {
			expect(getCurrentWorkout()).toEqual({ name: "", exercises: [] });
		});
	});

	describe("isCurrentWorkoutExist", () => {
		it("should return true if a current workout exists", () => {
			localStorage.setItem(
				"current_workout",
				JSON.stringify({ name: "Workout 1" })
			);
			expect(isCurrentWorkoutExist()).toBe(true);
		});

		it("should return false if no current workout exists", () => {
			expect(isCurrentWorkoutExist()).toBe(false);
		});
	});

	describe("saveCurrentWorkout", () => {
		it("should save the workout to localStorage", () => {
			const workout = { name: "Workout 1", exercises: [] };
			saveCurrentWorkout(workout);
			expect(localStorage.getItem("current_workout")).toEqual(
				JSON.stringify(workout)
			);
		});
	});

	describe("saveWorkout", () => {
		it("should save the workout with a generated ID to localStorage", () => {
			const workout = {
				name: "Workout 1",
				exercises: [],
				startTime: Date.now(),
			};
			generateId.mockReturnValue("unique-id-123");
			saveWorkout(workout);

			const savedWorkouts = JSON.parse(localStorage.getItem("trainings"));
			expect(savedWorkouts.length).toBe(1);
			expect(savedWorkouts[0]).toEqual({
				...workout,
				id: "unique-id-123",
			});
		});

		it("should add a new workout to existing workouts", () => {
			const existingWorkout = {
				name: "Old Workout",
				exercises: [],
				startTime: Date.now(),
				id: "old-id",
			};
			localStorage.setItem(
				"trainings",
				JSON.stringify([existingWorkout])
			);

			const newWorkout = {
				name: "New Workout",
				exercises: [],
				startTime: Date.now(),
			};
			generateId.mockReturnValue("unique-id-123");
			saveWorkout(newWorkout);

			const savedWorkouts = JSON.parse(localStorage.getItem("trainings"));
			expect(savedWorkouts.length).toBe(2);
			expect(savedWorkouts[1].id).toBe("unique-id-123");
		});
	});

	describe("getWorkouts", () => {
		it("should return an empty array if no workouts are stored", () => {
			expect(getWorkouts()).toEqual([]);
		});

		it("should return sorted workouts by startTime in descending order", () => {
			const workout1 = {
				name: "Workout 1",
				exercises: [],
				startTime: 2000,
				id: "1",
			};
			const workout2 = {
				name: "Workout 2",
				exercises: [],
				startTime: 1000,
				id: "2",
			};
			localStorage.setItem(
				"trainings",
				JSON.stringify([workout2, workout1])
			);
			expect(getWorkouts()).toEqual([workout1, workout2]);
		});
	});

	describe("getById", () => {
		it("should return a workout by its ID", () => {
			const workout1 = {
				name: "Workout 1",
				exercises: [],
				startTime: 2000,
				id: "1",
			};
			const workout2 = {
				name: "Workout 2",
				exercises: [],
				startTime: 1000,
				id: "2",
			};
			localStorage.setItem(
				"trainings",
				JSON.stringify([workout1, workout2])
			);
			expect(getById("1")).toEqual(workout1);
		});

		it("should return undefined if no workout with the given ID exists", () => {
			expect(getById("nonexistent-id")).toBeUndefined();
		});
	});

	describe("removeWorkout", () => {
		it("should remove a workout by its ID", () => {
			const workout1 = {
				name: "Workout 1",
				exercises: [],
				startTime: 2000,
				id: "1",
			};
			const workout2 = {
				name: "Workout 2",
				exercises: [],
				startTime: 1000,
				id: "2",
			};
			localStorage.setItem(
				"trainings",
				JSON.stringify([workout1, workout2])
			);

			removeWorkout("1");
			const savedWorkouts = JSON.parse(localStorage.getItem("trainings"));
			expect(savedWorkouts.length).toBe(1);
			expect(savedWorkouts[0].id).toBe("2");
		});
	});
});
