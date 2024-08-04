import { Button, Card, Col, List, Modal, Row } from "antd";
import Title from "antd/es/typography/Title";
import {
    DeleteFilled,
    ExclamationCircleOutlined,
} from "@ant-design/icons";

export const Programs = ({ programs, onOpen, onDelete }) => {
    const [modal, contextHolder] = Modal.useModal();

    const handleOnDelete = (program) => {
        modal.confirm({
            title: `Are you sure you want to delete program '${program.name}'?`,
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => {
                onDelete(program)
            }
        });
    }

    if (programs.length === 0) {
        return <></>
    }

    return (
        <>
            {contextHolder}
            <Title level={4}>Programs</Title>
            <List
                grid={{ gutter: 16, column: 1 }}
                dataSource={programs}
                renderItem={(program, index) => (
                    <List.Item>
                        <Card>
                            <Row align="middle">
                                <Col flex="auto">
                                    <Button
                                        type="text"
                                        style={{ width: '100%', textAlign: 'left', padding: 0, height: '100%', display: 'block' }}
                                        onClick={() => onOpen(program)}
                                    >
                                        <div style={{ fontSize: '24px', }}>
                                            {program.name}
                                        </div>
                                    </Button>
                                </Col>
                                <Col>
                                    <Button
                                        size="large"
                                        type="text"
                                        icon={<DeleteFilled />}
                                        onClick={() => handleOnDelete(program)}
                                    />
                                </Col>
                            </Row>
                        </Card>
                    </List.Item>
                )}
            />
        </>
    );
};
