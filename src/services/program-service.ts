type Set = {
	weight: number,
	reps: number
}

type ProgramExcercise = {
	name: string,
	sets: [Set]
}

export type Program = {
	name: string,
	exercises: [ProgramExcercise]
}

const PROGRAMS_STORAGE_KEY = "programs";

export function saveProgram(program: Program) {
	let programs = getPrograms();
	programs.push(program);
	localStorage.setItem(PROGRAMS_STORAGE_KEY, JSON.stringify(programs));
}

export function getProgramByName(name: string): Program | undefined {
	return getPrograms().find((p: Program) => p.name === name);
}

export function getPrograms(): Program[] {
	const json = localStorage.getItem(PROGRAMS_STORAGE_KEY);
	if (json) {
		return JSON.parse(json) as Program[] ?? [];
	}

	return [];
}

export function deleteProgram(name: string) {
	const programs = getPrograms().filter(program => program.name !== name);
	localStorage.setItem(PROGRAMS_STORAGE_KEY, JSON.stringify(programs));
}
