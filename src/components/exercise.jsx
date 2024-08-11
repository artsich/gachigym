import { useRef } from 'react';
import { Input, Switch, Form, SwipeAction, Grid } from 'antd-mobile';

export const Exercise = ({ field, onRemoveSet }) => {
	const ref = useRef(null)

	return (
		<SwipeAction
			key={field.index}
			ref={ref}
			closeOnAction={true}
			closeOnTouchOutside={true}
			rightActions={[{
				key: 'delete',
				text: 'Delete',
				color: 'danger',
				onClick: () => {
					onRemoveSet()
				}
			}
			]}
		>
			<Grid columns={5} gap={8}>
				<Grid.Item span={1}>
					<Form.Item
						name={[field.index, 'isDone']}>
						<Switch />
					</Form.Item>
				</Grid.Item>
				<Grid.Item span={2}>
					<Form.Item
						name={[field.index, 'weight']}
						label="Weight"
						required
					>
						<Input
							type='number'
							placeholder='...'
							clearable
							min={0}
							max={1000} />
					</Form.Item>
				</Grid.Item>
				<Grid.Item span={2}>
					<Form.Item
						name={[field.index, 'reps']}
						label="Reps"
						required
					>
						<Input
							type='number'
							placeholder="..."
							clearable
							min={0}
							max={1000} />
					</Form.Item>
				</Grid.Item>
			</Grid>
		</SwipeAction>
	);
};
