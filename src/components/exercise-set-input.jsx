import { DeleteOutlined } from '@ant-design/icons';
import { Button, Col, InputNumber, Row, Space } from 'antd';
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
        <Space size={16} style={{ alignItems: 'center' }}>
            <InputNumber
                placeholder="Weight"
                addonAfter="kg"
                value={weight === 0 ? '' : weight}
                onChange={(value) => handleOnWeightChange(value)}
            />
            <span>X</span>
            <InputNumber
                placeholder="Reps"
                value={reps === 0 ? '' : reps}
                onChange={(value) => handleOnChangeReps(value)}
                style={{ width: '120px' }} // Adjust width as needed
            />
            <Button
                icon={<DeleteOutlined />}
                onClick={onRemove}
            />
        </Space>
    )
}
