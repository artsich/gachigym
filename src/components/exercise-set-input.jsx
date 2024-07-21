import { DeleteOutlined } from '@ant-design/icons';
import { Button, Col, InputNumber, Row } from 'antd';
import React, { useState } from 'react'

export const ExerciseSetInput = ({ set, onUpdate, onRemove }) => {
    const [weight, setWeight] = useState(set.weight)
    const [reps, setReps] = useState(set.reps)

    const handleOnWeightChange = (weight) => {
        setWeight(weight)
        onUpdate({ weight, reps })
    }

    const handleOnChangeReps = (reps) => {
        setReps(reps)
        onUpdate({ weight, reps })
    }

    return (
        <Row gutter={[16, 16]} align="middle" >
            <Col span={8}>
                <InputNumber
                    placeholder="Weight"
                    addonAfter="kg"
                    value={weight === 0 ? '' : weight}
                    onChange={(value) => handleOnWeightChange(value)}
                />
            </Col>
            {'X'}
            <Col span={7}>
                <InputNumber
                    placeholder="Reps"
                    value={reps === 0 ? '' : reps}
                    onChange={(value) => handleOnChangeReps(value)}
                />
            </Col>
            <Col offset={5}>
                <Button
                    icon={<DeleteOutlined />}
                    onClick={onRemove}
                />
            </Col>
        </Row >
    )
}
