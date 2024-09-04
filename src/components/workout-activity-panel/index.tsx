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

function groupByDateCount(workouts: any) {
	return workouts.reduce((acc: any, workout: any) => {
		const workoutDate = formatDate(new Date(workout.finishTime));
		if (!acc[workoutDate]) {
			acc[workoutDate] = 0;
		}
		acc[workoutDate] += 1;
		return acc;
	}, {});
}

const githubThemeColors: ThemeInput = {
	dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
	light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
};

export const WorkoutActivityPanel = () => {
	const today = new Date();
	const fourMonthsAgo = new Date(
		today.getFullYear(),
		today.getMonth() - 4,
		today.getDate()
	);

	const { theme } = useTheme();
	const [workouts] = useState(() => getWorkoutsInRange(fourMonthsAgo, today));

	const workoutMap = groupByDateCount(workouts);

	const values: Activity[] = [
		// today and fourMonthsAgo is required
		// to display panel when workouts.lenght === 0
		{
			date: formatDate(today),
			count: 0,
			level: 0,
		},
		...Object.entries(workoutMap).map(([date, count]) => ({
			date,
			count: count as number,
			level: (count as number) > 2 ? 4 : 1,
		})),
		{
			date: formatDate(fourMonthsAgo),
			count: 0,
			level: 0,
		},
	];

	return (
		<>
			<ActivityCalendar
				colorScheme={theme}
				theme={githubThemeColors}
				data={values}
				loading={values.length === 0}
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
