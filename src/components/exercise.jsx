import { Button, Col, Collapse, Divider, Input, Row } from 'antd';
import Title from 'antd/es/skeleton/Title';
import React, { useState } from 'react'
import { ExerciseSetInput } from './exercise-set-input';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';

export const Exercise = ({ exercise, onUpdate, onRemove }) => {
    const [isOpen, setIsOpen] = useState(false);

    const updateExercise = (updatedFields) => {
        onUpdate({ ...exercise, ...updatedFields });
    };

    const updateSet = (set, index) => {
        const sets = exercise.sets.map((s, i) => (i === index ? set : s));
        updateExercise({ sets });
    };

    const updateName = (name) => updateExercise({ name });

    const addSet = () => {
        const sets = [...exercise.sets, { weight: 0, reps: 0 }];
        updateExercise({ sets });
    };

    const removeSet = (index) => {
        const sets = exercise.sets.filter((_, i) => i !== index);
        updateExercise({ sets });
    };

    const items = [
        {
            key: '1',
            label: (
                <>
                    <Row align="middle">
                        <Col>
                            <Input
                                placeholder="Название упражнения"
                                value={exercise.name}
                                onChange={(e) => updateName(e.target.value)}
                                required={true}
                            />
                        </Col>
                        <Col offset={8}>
                            <Button
                                icon={<DeleteOutlined />}
                                onClick={() => onRemove()}
                            />
                        </Col>
                    </Row>
                </>
            ),
            children: (
                <>
                    {exercise.sets.map((set, index) => (
                        <div key={index}>
                            <ExerciseSetInput
                                set={{ weight: set.weight, reps: set.reps }}
                                onUpdate={(set) => updateSet(set, index)}
                                onRemove={() => removeSet(index)}
                            />
                            <Divider />
                        </div >
                    ))}
                    <div style={{ textAlign: 'center', marginTop: '16px' }}>
                        <Button
                            type="text"
                            onClick={addSet}
                            icon={<PlusCircleOutlined style={{ fontSize: '32px' }} />} />
                    </div>
                </>
            ),
        },
    ];

    return (
        <Collapse onChange={() => setIsOpen(!isOpen)} items={items} />
    );
};
