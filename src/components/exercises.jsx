import React, { useRef } from 'react';
import { Form, Button, Input, Space, VirtualInput, NumberKeyboard, Switch, Grid, SwipeAction, Dialog } from 'antd-mobile';
import { Exercise } from './exercise';
import { AddCircleOutline, DeleteOutline } from 'antd-mobile-icons';

const DeleteExerciseButton = ({ onClick }) => (
	<Button
		size='large'
		fill='none'
		color='primary'
		onClick={() => Dialog.confirm({
			title: 'Remove excercise',
			confirmText: 'Remove',
			cancelText: 'No',
			onConfirm: onClick
		})}
	>
		<DeleteOutline />
	</Button >

)


export const Exercises = () => {
	return (
		<Form.Array
			name="exercises"
			onAdd={operation => operation.add({ name: '', sets: [] })}
			renderAdd={() => (
				<span>
					<AddCircleOutline /> Add excersise
				</span>
			)}
			renderHeader={({ index }, { remove }) => (
				<>
				</>
			)}
		>
			{fields =>
				fields.map(({ index }) => (
					<>
						<Form.Item
							name={[index, 'name']}
							label='name'
							rules={[{ required: true, message: 'name is required' }]}
						>
							<Input placeholder='Exercise name' />
						</Form.Item>
						<Form.Array
							name={[index, 'sets']}
							onAdd={operation => operation.add({ weight: '', reps: '' })}
							renderAdd={() => (
								<span>
									<AddCircleOutline /> Add set
								</span>
							)}
						>
							{(fields, { removeSet }) => fields.map((field) => (
								<Exercise
									field={field}
									onRemoveSet={removeSet} />
							))}
						</Form.Array >
					</>
				))
			}
		</Form.Array >

		// <Form.List
		// 	name="exercises"
		// 	rules={[
		// 		{
		// 			validator: async (_, exercises) => {
		// 				if (!exercises || exercises.length < 1) {
		// 					// TODO: message.error("At least one exercises are required!")
		// 					return Promise.reject(new Error('At least two exercises are required'));
		// 				}
		// 				return Promise.resolve();
		// 			},
		// 		},
		// 	]}
		// >
		// 	{(fields, { add, remove }) => (
		// 		<>
		// 			<Excersise
		// 				fields={fields}
		// 				onRemove={(key) => remove(key)} />
		// 			<Form.Item>
		// 				{/* <Button
		// 				style={{ display: 'block', margin: '16px auto' }}
		// 				type="dashed"
		// 				onClick={() => add()}
		// 				icon={<PlusOutlined />}>
		// 				Add Exercise
		// 			</Button> */}
		// 			</Form.Item>
		// 		</>
		// 	)}
		// </Form.List>
	);
};
