import React from "react";
import {Button, Dialog} from "antd-mobile";
import {DeleteOutline} from "antd-mobile-icons";
import {DialogConfirmProps} from "antd-mobile/es/components/dialog/confirm";

export const DeleteExerciseButton = ({onClick}: { onClick: DialogConfirmProps["onConfirm"] }) => {
	return (
		<Button
			size="large"
			fill="none"
			color="primary"
			onClick={async () => {
				await Dialog.confirm({
					title: "Remove exercise",
					confirmText: "Remove",
					cancelText: "No",
					onConfirm: onClick
				});
			}}
		>
			<DeleteOutline fontSize={32}/>
		</Button>
	);
};
