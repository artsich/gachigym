import { useEffect, useState } from "react";
import { Picker } from "antd-mobile";
import { Set } from "../../services/program-service";
import { RightOutline } from "antd-mobile-icons";
import { PickerValue } from "antd-mobile/es/components/picker-view";
import "./style.css";

const weightOptions = Array.from({ length: 1001 }, (_, i) => ({
	label: `${i} kg`,
	value: i.toString(),
}));

const repsOptions = Array.from({ length: 1001 }, (_, i) => ({
	label: `${i} reps`,
	value: i.toString(),
}));

const columns = [weightOptions, repsOptions];

export const ConfirmCompletedSet = ({
	set,
	onDone,
}: {
	set: Set;
	onDone: (set: Set) => void;
}) => {
	const [visible, setVisible] = useState(false);
	const [selectedValues, setSelectedValues] = useState([
		set.weight?.toString() || "0",
		set.reps?.toString() || "0",
	]);

	useEffect(() => {
		setSelectedValues([
			set.weight?.toString() || "0",
			set.reps?.toString() || "0",
		]);
	}, [set]);

	const handleConfirm = (values: PickerValue[]) => {
		onDone({
			weight: parseInt(values[0]!.toString()),
			reps: parseInt(values[1]!.toString()),
		});
	};

	return (
		<>
			<button className="set-done-btn" onClick={() => setVisible(true)}>
				<RightOutline />
			</button>

			<Picker
				columns={columns}
				visible={visible}
				onClose={() => setVisible(false)}
				value={selectedValues}
				onConfirm={handleConfirm}
			/>
		</>
	);
};
