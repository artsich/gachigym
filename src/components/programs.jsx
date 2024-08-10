import { List, SwipeAction, Dialog } from "antd-mobile";
import { useRef } from "react";

export const Programs = ({ programs, onOpen, onDelete }) => {
	const ref = useRef(null)

	if (programs.length === 0) {
		return <></>
	}

	return (
		<List header="Programs">
			{programs.map((program, index) => (
				<SwipeAction
					key={index} // todo: index should be unique for each program.
					ref={ref}
					closeOnAction={false}
					closeOnTouchOutside={false}
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
								ref.current?.close()
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
