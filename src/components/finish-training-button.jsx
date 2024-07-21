import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Space } from "antd";

export const FinishTrainingButton = ({ onFinish }) => {
    const [modal, contextHolder] = Modal.useModal();

    const confirm = () => {
        modal.confirm({
            title: 'Finish training?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => onFinish()
        });
    };

    return (
        <>
            <Space>
                <Button type="primary" onClick={confirm}>Finish training</Button>
            </Space>
            {contextHolder}
        </>
    )
}
