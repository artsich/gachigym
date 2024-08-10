import { Collapse, Form, Input, NumberKeyboard, Space, Switch, VirtualInput } from 'antd-mobile';
import { AddCircleOutline } from 'antd-mobile-icons';
import React from 'react';
// import { Form, Input, Button, Space, Collapse, Row, Col, Divider, InputNumber } from 'antd-mobile';
// import { PlusCircleOutlined, DeleteOutlined, MinusCircleOutlined } from '@ant-design/icons';

export const Excersise = ({ fields }) => {
	console.log(fields)
	return (
		<Collapse >
			<Collapse.Panel key='1' title='Приседания'>
				<Form.Item
					name={[fields.name, 'name']}
					label='Excersise name'
					rules={[{ required: true, message: 'Name the excersise' }]}
				>
					<Input placeholder='name' />
				</Form.Item>

				<Form.Array
					name={'sets'}
					renderAdd={() => (
						<span>
							<AddCircleOutline /> Add set
						</span>
					)}
					onAdd={operation => operation.add({ isDone: false, weight: '', reps: '' })}
				>
					{fields => fields.map((field, index) => (
						<Space wrap>
							<Form.Item
								layout='horizontal'
								name={[field.name, "isDone"]}
								label=''
								childElementPosition='left'
							>
								<Switch />
							</Form.Item>

							<Form.Item
								layout='horizontal'
								name={[field.name, "weight"]}
								rules={[{ required: true }]}>
								<Input
									placeholder='Weight'
									clearable
									keyboard={<NumberKeyboard />}
								/>
							</Form.Item>
							<Form.Item
								layout='horizontal'
								name={[field.name, "reps"]}
								rules={[{ required: true }]}>
								<Input
									placeholder='Reps'
									clearable
									keyboard={<NumberKeyboard />}
								/>
							</Form.Item>
						</Space>
					))}
				</Form.Array>
			</Collapse.Panel>
		</Collapse >)
}

// const items = fields.map((field, _) => ({
// 	key: field.key,
// 	label: (
// 		<Row style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
// 			<Col flex="auto" style={{ marginRight: '8px' }}>
// 				<Form.Item
// 					name={[field.name, 'name']}
// 					rules={[{ required: true, message: 'Please enter the exercise name' }]}
// 					noStyle
// 				>
// 					<Input placeholder="Exercise name" style={{ width: '100%' }} />
// 				</Form.Item>
// 			</Col>
// 			<Col>
// 				<Button
// 					icon={<DeleteOutlined />}
// 					onClick={() => { onRemove(field.name) }}
// 				/>
// 			</Col>
// 		</Row>
// 	),
// 	children: (
// 		<Form.List name={[field.name, 'sets']}>
// 			{(setFields, { add: addSet, remove: removeSet }) => (
// 				<>
// 					{setFields.map((setField) => (
// 						<div key={setField.key}>
// 							<Space align="baseline">
// 								<Form.Item
// 									name={[setField.name, 'weight']}
// 									rules={[{ required: true, message: 'Missing weight' }]}
// 									noStyle
// 								>
// 									<InputNumber
// 										placeholder="Weight"
// 										addonAfter="kg" />
// 								</Form.Item>
// 								<Form.Item
// 									name={[setField.name, 'reps']}
// 									rules={[{ required: true, message: 'Missing reps' }]}
// 									noStyle>
// 									<InputNumber
// 										placeholder="Reps"
// 										style={{ width: '120px' }} />
// 								</Form.Item>
// 								<Button icon={<MinusCircleOutlined />} onClick={() => removeSet(setField.name)} />
// 							</Space>
// 							<Divider />
// 						</div>
// 					))}
// 					<div style={{ textAlign: 'center', marginTop: '16px' }}>
// 						<Button
// 							type="text"
// 							onClick={() => addSet()}
// 							icon={<PlusCircleOutlined style={{ fontSize: '32px' }} />}
// 						/>
// 					</div>
// 				</>
// 			)}
// 		</Form.List>
// 	)
// }));
