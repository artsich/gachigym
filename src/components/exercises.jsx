import React from 'react';
import { Form, Input, Grid } from 'antd-mobile';
import { AddCircleOutline } from 'antd-mobile-icons';
import { ExerciseSet } from './exercise-set';
import { DeleteExerciseButton } from './delete-exercise-button';

export const Exercises = () => {
	return (
		<Form.Array
			name="exercises"
			renderAdd={() => (
				<span>
					<AddCircleOutline /> Add excersise
				</span>
			)}
		>
			{(fields, { remove }) =>
				fields.map(({ index }) => (
					<>
						<Grid columns={4}>
							<Grid.Item span={3} >
								<Form.Item
									name={[index, 'name']}
									rules={[{ required: true, message: 'Name is required' }]}
								>
									<Input placeholder='Exercise name' />
								</Form.Item>
							</Grid.Item>
							<Grid.Item>
								<DeleteExerciseButton onClick={() => remove(index)} />
							</Grid.Item>
						</Grid>
						<Form.Array
							name={[index, 'sets']}
							renderAdd={() => (
								<span>
									<AddCircleOutline /> Add set
								</span>
							)}
						>
							{(fields, { remove }) => fields.map((field) => (
								<ExerciseSet
									field={field}
									onRemoveSet={() => remove(field.index)} />
							))}
						</Form.Array >
					</>
				))
			}
		</Form.Array >
	);
};
