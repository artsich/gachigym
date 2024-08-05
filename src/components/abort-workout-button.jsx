import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";

export const AbortWorkoutButton = ({ onFinish }) => {
    const [modal, contextHolder] = Modal.useModal();

    const confirm = async () => {
        modal.confirm({
            title: 'Abort workout?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => onFinish()
        });
    };

    return (
        <>
            <Button
                size="large"
                block
                danger
                onClick={confirm}>
                Abort
            </Button>
            {contextHolder}
        </>
    )
}
