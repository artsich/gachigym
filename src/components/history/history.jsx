import { Button, Dialog, ErrorBlock, NavBar } from "antd-mobile";
import { Workouts } from "./workouts";
import { DeleteOutline, MoreOutline } from "antd-mobile-icons";
import { ThemedPopoverMenu } from "../shared/themed-popover-menu";

export const History = ({ workouts, onRemoveAll, onCreateNew }) => {
	const actions = [
		{
			key: "clean",
			icon: <DeleteOutline />,
			text: "Clean history",
			onClick: () => {
				if (workouts.length > 0) {
					Dialog.confirm({
						title: "Remove all?",
						onConfirm: onRemoveAll,
					});
				}
			},
		},
	];

	return (
		<div style={{ padding: "6px" }}>
			<NavBar
				style={{
					"--border-bottom": "1px #eee solid",
					marginBottom: "32px",
				}}
				backIcon={<></>}
				right={
					<div style={{ fontSize: 32 }}>
						<ThemedPopoverMenu
							actions={actions}
							placement="bottom-start"
							trigger="click"
						>
							<MoreOutline />
						</ThemedPopoverMenu>
					</div>
				}
			>
				Past Workouts
			</NavBar>

			{workouts.length > 0 ? (
				<Workouts workouts={workouts} />
			) : (
				<ErrorBlock title="No workouts" description="" status="empty">
					<Button color="primary" onClick={() => onCreateNew()}>
						Create new
					</Button>
				</ErrorBlock>
			)}
		</div>
	);
};
