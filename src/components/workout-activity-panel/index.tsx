import React, { useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import ActivityCalendar, {
	Activity,
	ThemeInput,
} from "react-activity-calendar";
import { getWorkoutsInRange } from "../../services/workout-service";
import { useTheme } from "../../theme/theme-provider";

function formatDate(date: Date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

const today = new Date();
const fourMonthsAgo = new Date(
	today.getFullYear(),
	today.getMonth() - 4,
	today.getDate()
);

interface DateCountMap {
	[date: string]: number;
}

function groupByDateCount(workouts: any): DateCountMap {
	return workouts.reduce((acc: any, workout: any) => {
		const workoutDate = formatDate(new Date(workout.finishTime));
		if (!acc[workoutDate]) {
			acc[workoutDate] = 0;
		}
		acc[workoutDate] += 1;
		return acc;
	}, {});
}

function workoutToActivity(workouts: any): Activity[] {
	const workoutMap = groupByDateCount(workouts);

	if (!(formatDate(today) in workoutMap)) {
		workoutMap[formatDate(today)] = 0;
	}

	if (!(formatDate(fourMonthsAgo) in workoutMap)) {
		workoutMap[formatDate(fourMonthsAgo)] = 0;
	}

	return Object.entries(workoutMap)
		.map(([date, count]) => ({
			date,
			count: count,
			level: count >= 4 ? 4 : count,
		}))
		.sort((a, b) => compareDates(a.date, b.date));
}

function compareDates(date1: string, date2: string): number {
	return new Date(date1).getTime() - new Date(date2).getTime();
}

const githubThemeColors: ThemeInput = {
	dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
	light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
};

export const WorkoutActivityPanel = () => {
	const { theme } = useTheme();
	// TODO: when workout create, this component does not update state :(
	const [workouts] = useState(() => getWorkoutsInRange(fourMonthsAgo, today));

	return (
		<>
			<ActivityCalendar
				colorScheme={theme}
				theme={githubThemeColors}
				data={workoutToActivity(workouts)}
				renderBlock={(block, activity) =>
					React.cloneElement(block, {
						"data-tooltip-id": "react-tooltip",
						"data-tooltip-html": `${activity.count} activities on ${activity.date}`,
					})
				}
				labels={{
					totalCount: "{{count}} in last 4 month",
				}}
				showWeekdayLabels
				weekStart={0}
			/>
			<ReactTooltip id="react-tooltip" />
		</>
	);
};
