import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";

export const CancelWorkoutButton = ({ onClick }) => {
	const [modal, contextHolder] = Modal.useModal();

	const confirm = async () => {
		modal.confirm({
			title: 'Are you sure you want to cancel workout?',
			icon: <ExclamationCircleOutlined />,
			okText: 'Yes',
			cancelText: 'No',
			onOk: () => onClick()
		});
	};

	return (
		<>
			<Button
				size="large"
				block
				danger
				onClick={confirm}>
				Cancel
			</Button>
			{contextHolder}
		</>
	)
}
