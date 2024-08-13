import { Button, Dialog } from "antd-mobile";

export const FinishTrainingButton = ({ onBeforeFinish, onFinish }) => {
	const confirm = async () => {
		if (await onBeforeFinish()) {
			await Dialog.confirm({
				content: "Finish workout?",
				confirmText: "Yes",
				cancelText: "No",
				onConfirm: () => onFinish()
			});
		}
	};

	return (
		<Button block size='middle' color="primary" onClick={confirm}>Finish</Button>
	);
};
