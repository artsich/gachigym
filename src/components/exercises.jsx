import React from 'react';
import { Form, Button } from 'antd-mobile';
import { Excersise } from './exercise';
import { AddCircleOutline } from 'antd-mobile-icons';

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
					{/* <span>联系人{index + 1}</span> */}
					{/* <a onClick={() => remove(index)} style={{ float: 'right' }}>
						Remove
					</a> */}
				</>
			)}
		>
			{fields =>
				fields.map(({ field, index }) => (
					<>
						<Excersise
							fields={field}
							onRemove={(key) => { }/*remove(key)*/} />
					</>
				))
			}

		</Form.Array>

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
