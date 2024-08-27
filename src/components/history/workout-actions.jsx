import { Dialog, Popover, Space } from "antd-mobile";
import {
	DeleteOutline,
	HeartFill,
	HeartOutline,
	MoreOutline,
} from "antd-mobile-icons";
import { getProgramByName } from "../../services/program-service";
import { useState } from "react";
import { useTheme } from "../../theme/theme-provider";

export const WorkoutActions = ({
	workout,
	onRemove,
	onSaveProgram,
	onDeleteProgram,
}) => {
	const [isProgram, setIsProgram] = useState(false);
	const { theme } = useTheme();

	const onClickPopover = () => {
		setIsProgram(getProgramByName(workout.name) !== undefined);
	};

	const actions = [
		{
			key: "remove",
			icon: <DeleteOutline />,
			text: "remove workout",
			onClick: () => {
				Dialog.confirm({
					title: "Remove workout?",
					onConfirm: onRemove,
				});
			},
		},
		{
			key: "program",
			icon: isProgram ? <HeartFill /> : <HeartOutline />,
			text: isProgram ? "remove from programs" : "save as program",
			onClick: () => {
				isProgram ? onDeleteProgram() : onSaveProgram();
			},
		},
	];

	return (
		<Space justify="center">
			<div style={{ fontSize: 24 }} onClick={onClickPopover}>
				<Popover.Menu
					mode={theme}
					actions={actions}
					placement="bottom-start"
					trigger="click"
				>
					<MoreOutline />
				</Popover.Menu>
			</div>
		</Space>
	);
};
