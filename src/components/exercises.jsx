import React from 'react';
import { Form, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Exercise } from './exercise';

export const Exercises = () => {
    return (
        <Form.List
            name="exercises"
            rules={[
                {
                    validator: async (_, exercises) => {
                        if (!exercises || exercises.length < 1) {
                            message.error("At least one exercises are required!")
                            return Promise.reject(new Error('At least two exercises are required'));
                        }
                        return Promise.resolve();
                    },
                },
            ]}
        >
            {(fields, { add, remove }) => (
                <>
                    <Exercise
                        fields={fields}
                        onRemove={(key) => remove(key)} />
                    <Form.Item>
                        <Button
                            style={{ display: 'block', margin: '16px auto' }}
                            type="dashed"
                            onClick={() => add()}
                            icon={<PlusOutlined />}>
                            Add Exercise
                        </Button>
                    </Form.Item>
                </>
            )}
        </Form.List>
    );
};
