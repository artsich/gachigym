import { List, SwipeAction, Dialog } from "antd-mobile";
import { useRef } from "react";

export const Programs = ({ programs, onOpen, onDelete }) => {

	if (programs.length === 0) {
		return <></>
	}

	return (
		<List header="Programs">
			{programs.map((program, index) => (
				<SwipeAction
					key={index} // todo: index should be unique for each program.
					closeOnAction={true}
					closeOnTouchOutside={true}
					rightActions={[
						{
							key: 'delete',
							text: 'Delete',
							color: 'danger',
							onClick: async () => {
								await Dialog.confirm({
									content: `Delete program '${program.name}'?`,
									confirmText: 'Yes',
									cancelText: 'No',
									onConfirm: () => onDelete(program)
								})
							},
						},
					]}
				>
					<List.Item onClick={() => onOpen(program)}>
						<div style={{ fontSize: '24px', }}>
							{program.name}
						</div>
					</List.Item>
				</SwipeAction>
			))}
		</List >
	)
};
