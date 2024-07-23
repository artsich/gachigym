import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { List, Typography, Layout, Card, Modal } from 'antd';
import { getWorkouts, removeWorkout } from '../services/workout-service';
import { DeleteOutlined } from '@ant-design/icons';
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title } = Typography;

export const WorkoutsPage = () => {
    const [workouts, setWorkouts] = useState(getWorkouts());
    const [modal, contextHolder] = Modal.useModal();

    const handleRemoveWorkout = (id) => {
        modal.confirm({
            title: 'Are you sure you want to delete it?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => {
                removeWorkout(id)
                setWorkouts(getWorkouts())
            }
        });
    };

    return (
        <Layout>
            <Content style={{ padding: '50px' }}>
                <Title level={1} style={{ textAlign: 'center' }}>Past Workouts</Title>
                <List
                    itemLayout="vertical"
                    dataSource={workouts}
                    renderItem={(workout, _) => (
                        <List.Item>
                            <Card
                                style={{ width: '100%', marginBottom: 16 }}
                                actions={[
                                    <>
                                        <DeleteOutlined
                                            key="delete"
                                            onClick={() => handleRemoveWorkout(workout.id)} />
                                        {contextHolder}
                                    </>
                                ]}
                            >
                                <Card.Meta
                                    title={
                                        <Link to={`/workout/${workout.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span>{workout.name || 'NaN'}</span>
                                                <span>{new Date(workout.startTime).toLocaleDateString()}</span>
                                            </div>
                                        </Link>
                                    }
                                />
                            </Card>
                        </List.Item>
                    )}
                />
            </Content>
        </Layout>
    );
};