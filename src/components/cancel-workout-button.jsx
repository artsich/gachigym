import { Button, Dialog } from "antd-mobile";

export const CancelWorkoutButton = ({ onClick }) => {
	const confirm = async () => {
		await Dialog.confirm({
			content: `Cancel workout?`,
			confirmText: 'Yes',
			cancelText: 'No',
			onConfirm: () => onClick()
		})
	};

	return (
		<Button
			size='middle'
			color="danger"
			block
			danger
			onClick={confirm}>
			Cancel
		</Button>
	)
}
