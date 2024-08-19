import { Button, Dialog } from "antd-mobile";

export const FinishTrainingButton = ({ onBeforeFinish, onFinish }) => {
	const confirm = async () => {
		if (await onBeforeFinish()) {
			await Dialog.confirm({
				title: "Finish workout?",
				onConfirm: () => onFinish(),
			});
		}
	};

	return (
		<Button block size="middle" color="primary" onClick={confirm}>
			Finish
		</Button>
	);
};
