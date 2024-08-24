import { useEffect, useState } from "react";

function calculateTimePassed(startTime: Date) {
	const start = new Date(startTime).getTime();
	const now = new Date().getTime();
	return now - start;
}

function formatTime(milliseconds: number) {
	const totalSeconds = Math.floor(milliseconds / 1000);
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	return `${hours.toString().padStart(2, "0")}:${minutes
		.toString()
		.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export function Timer({ startTime }: { startTime: Date }) {
	const [timePassed, setTimePassed] = useState(
		calculateTimePassed(startTime)
	);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTimePassed(calculateTimePassed(startTime));
		}, 1000);

		return () => clearInterval(intervalId);
	}, [startTime]);

	return <p style={{ fontSize: "32px" }}>{formatTime(timePassed)}</p>;
}
