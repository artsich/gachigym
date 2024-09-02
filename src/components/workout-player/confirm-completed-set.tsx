import { useEffect, useState } from "react";
import { Button, Form, Input, Popup } from "antd-mobile";
import { Set } from "../../services/program-service";

export const ConfirmCompletedSet = ({
	set,
	onDone,
}: {
	set: Set;
	onDone: (set: Set) => void;
}) => {
	const [visible, setVisible] = useState(false);
	const [formData, setFormData] = useState(set);

	useEffect(() => {
		setFormData(set);
	}, [set]);

	const handleChange = (name: string, value: any) => {
		setFormData({
			...formData,
			[name]: value,
		});
	};

	return (
		<>
			<Button block color="success" onClick={() => setVisible(true)}>
				Done
			</Button>
			<Popup
				visible={visible}
				bodyStyle={{ height: "40vh" }}
				onMaskClick={() => {
					setVisible(false);
				}}
				onClose={() => {
					setVisible(false);
				}}
			>
				<Form
					layout="horizontal"
					onFinish={() => {
						setVisible(false);
						onDone(formData);
					}}
					mode="card"
				>
					<Form.Header>Confirm results</Form.Header>
					<Form.Item label="Weight">
						<Input
							value={`${formData.weight}`}
							type="number"
							inputMode="numeric"
							placeholder="..."
							clearable
							onChange={(value) => handleChange("weight", value)}
							min={0}
							max={1000}
						/>
					</Form.Item>
					<Form.Item label="Reps">
						<Input
							value={`${formData.reps}`}
							type="number"
							inputMode="numeric"
							placeholder="..."
							clearable
							onChange={(value) => handleChange("reps", value)}
							min={0}
							max={1000}
						/>
					</Form.Item>
					<Button block color="primary" type="submit">
						Done
					</Button>
				</Form>
			</Popup>
		</>
	);
};
