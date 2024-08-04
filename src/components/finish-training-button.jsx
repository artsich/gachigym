import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";

export const FinishTrainingButton = ({ onBeforeFinish, onFinish }) => {
    const [modal, contextHolder] = Modal.useModal();

    const confirm = async () => {
        if (await onBeforeFinish()) {
            modal.confirm({
                title: 'Finish training?',
                icon: <ExclamationCircleOutlined />,
                okText: 'Yes',
                cancelText: 'No',
                onOk: () => onFinish()
            });
        }
    };

    return (
        <>
            <Button type="primary" onClick={confirm}>Finish training</Button>
            {contextHolder}
        </>
    )
}
