import { AutoCenter, Tag } from "antd-mobile";
import { ClockCircleOutline } from "antd-mobile-icons";
import "./style.css";

export const WorkoutDuration = ({ startTime, finishTime }) => {
	function calculateDuration(startTime, finishTime) {
		const timeDifference = new Date(finishTime - startTime);
		const hours = Math.floor(timeDifference / 3600000);
		const minutes = Math.round((timeDifference % 3600000) / 60000);

		return `${hours <= 1 ? "" : hours + "h"} ${minutes}m`;
	}

	return (
		<AutoCenter>
			<Tag round="true" className="workout-duration">
				<ClockCircleOutline />
				<span>{calculateDuration(startTime, finishTime)}</span>
			</Tag>
		</AutoCenter>
	);
};
