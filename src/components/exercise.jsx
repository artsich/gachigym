import React from 'react';
import { Form, Input, Button, Space, Collapse, Row, Col, Divider, InputNumber } from 'antd';
import { PlusCircleOutlined, DeleteOutlined, MinusCircleOutlined } from '@ant-design/icons';

export const Exercise = ({ fields, onRemove }) => {
    const items = fields.map((field, _) => ({
        key: field.key,
        label: (
            <Row style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <Col flex="auto" style={{ marginRight: '8px' }}>
                    <Form.Item
                        name={[field.name, 'name']}
                        rules={[{ required: true, message: 'Please enter the exercise name' }]}
                        noStyle
                    >
                        <Input placeholder="Exercise name" style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col>
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() => { onRemove(field.name) }}
                    />
                </Col>
            </Row>
        ),
        children: (
            <Form.List name={[field.name, 'sets']}>
                {(setFields, { add: addSet, remove: removeSet }) => (
                    <>
                        {setFields.map((setField) => (
                            <div key={setField.key}>
                                <Space align="baseline">
                                    <Form.Item
                                        name={[setField.name, 'weight']}
                                        rules={[{ required: true, message: 'Missing weight' }]}
                                        noStyle
                                    >
                                        <InputNumber
                                            placeholder="Weight"
                                            addonAfter="kg" />
                                    </Form.Item>
                                    <Form.Item
                                        name={[setField.name, 'reps']}
                                        rules={[{ required: true, message: 'Missing reps' }]}
                                        noStyle>
                                        <InputNumber
                                            placeholder="Reps"
                                            style={{ width: '120px' }} />
                                    </Form.Item>
                                    <Button icon={<MinusCircleOutlined />} onClick={() => removeSet(setField.name)} />
                                </Space>
                                <Divider />
                            </div>
                        ))}
                        <div style={{ textAlign: 'center', marginTop: '16px' }}>
                            <Button
                                type="text"
                                onClick={() => addSet()}
                                icon={<PlusCircleOutlined style={{ fontSize: '32px' }} />}
                            />
                        </div>
                    </>
                )}
            </Form.List>
        )
    }));

    return (
        <Collapse
            style={{ marginTop: '16px' }}
            items={items} />
    )
}
