import React, { useRef } from 'react';
import { Form, Button, Input, Space, VirtualInput, NumberKeyboard, Switch, Grid, SwipeAction, Dialog } from 'antd-mobile';
import { ExerciseSet } from './exercise-set';
import { AddCircleOutline, DeleteOutline } from 'antd-mobile-icons';

const DeleteExerciseButton = ({ onClick }) => (
	<Button
		size='large'
		fill='none'
		color='primary'
		onClick={async () => await Dialog.confirm({
			title: 'Remove excercise',
			confirmText: 'Remove',
			cancelText: 'No',
			onConfirm: onClick
		})}
	>
		<DeleteOutline fontSize={32} />
	</Button >
)

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
