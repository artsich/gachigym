// todo: style is shit, fix it.
export const SetBadge = ({
	weight,
	reps,
}: {
	weight: number;
	reps: number;
}) => {
	const repsWeight = () => (
		<>
			<div className="badge-weight">{weight}</div>
			<div className="badge-reps">{reps}</div>
			<div className="badge-label-KG">KG</div>
		</>
	);

	const onlyReps = () => (
		<>
			<div className="badge-weight">{reps}</div>
		</>
	);

	return (
		<div className="badge">{weight > 0 ? repsWeight() : onlyReps()}</div>
	);
};
