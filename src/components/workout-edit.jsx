import React, { useState } from 'react';
import { Divider, Row, Col, Button, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Exercise } from './exercise';
import { FinishTrainingButton } from './finish-training-button';

export const WorkoutEdit = ({ workout, onUpdate, onFinish }) => {
    const [started, setStarted] = useState(workout.startTime != null)

    const updateWorkoutName = (name) => {
        onUpdate({ ...workout, name })
    }

    const updateExercise = (exercise, index) => {
        const newExercises = [...workout.exercises]
        newExercises[index] = exercise
        onUpdate({ ...workout, exercises: newExercises })
    }

    const addExercise = () => onUpdate({ ...workout, exercises: [...workout.exercises, { name: '', sets: [] }] })

    const startTraining = () => {
        setStarted(true)
        onUpdate({ ...workout, startTime: Date.now() })
    }

    const finishTraining = () => {
        onFinish()
    }

    return (
        <div style={{ padding: '16px' }}>
            <Row gutter={[16, 16]} align="middle" justify="space-between">
                <Col flex="auto">
                    <Input
                        placeholder="Training name"
                        value={workout.name}
                        onChange={(e) => updateWorkoutName(e.target.value)}
                    />
                </Col>
                {started ? <Col>
                    <FinishTrainingButton onFinish={finishTraining} />
                </Col> : <Col>
                    <Button type="default" onClick={startTraining}>
                        Start training
                    </Button>
                </Col>}
            </Row>
            <Divider />
            {workout.startTime ? 'Display ellapsed time....' : <></>}
            {
                workout.exercises.map((exercise, idx) => (
                    <div key={idx} style={{ marginBottom: '12px' }}>
                        <Exercise
                            exercise={exercise}
                            onUpdate={(exercise) => updateExercise(exercise, idx)}
                        />
                    </div>
                ))
            }
            <Button size="large" style={{ display: 'block', margin: '16px auto' }} icon={<PlusOutlined />} onClick={addExercise} />
            <Button size="large" type='dashed' style={{ display: 'block', margin: '16px auto' }}>Save as template</Button>
        </div >
    )
}
