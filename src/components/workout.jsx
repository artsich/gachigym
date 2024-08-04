import React, { useEffect } from 'react';
import { Form, Input, Col, Row, Button } from 'antd';
import { Exercises } from './exercises';
import { FinishTrainingButton } from './finish-training-button';

export const Workout = ({ workout, onUpdate, onFinish, onSaveAsProgram }) => {
    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue(workout)
    }, [form, workout])

    const saveAsProgram = () =>
        onSaveAsProgram({ name: workout.name, exercises: [...workout.exercises] })

    return (
        <Form
            form={form}
            name="workout_form"
            onFinish={onFinish}
            onValuesChange={(_, v) => onUpdate(v)}
            autoComplete="off"
            style={{ padding: '16px' }}
        >
            <Row gutter={[16, 16]} align="middle" justify="space-between">
                <Col flex="auto">
                    <Form.Item
                        name="name"
                        noStyle
                        rules={[{ required: true, message: 'Please input the workout name!' }]}
                    >
                        <Input placeholder="Workout Name" />
                    </Form.Item>
                </Col>
                <Col>
                    <FinishTrainingButton onBeforeFinish={async () => {
                        try {
                            await form.validateFields();
                            return true;
                        } catch (__1) {
                            return false;
                        }
                    }} onFinish={() => form.submit()} />
                </Col>
            </Row>

            <Exercises />
            <Button size="large" type='dashed' style={{ display: 'block', margin: '16px auto' }} onClick={saveAsProgram}>Save as Program</Button>
        </Form >
    );
};
