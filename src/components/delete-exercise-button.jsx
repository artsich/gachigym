import React from 'react';
import { Button, Dialog } from 'antd-mobile';
import { DeleteOutline } from 'antd-mobile-icons';

export const DeleteExerciseButton = ({ onClick }) => (
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
