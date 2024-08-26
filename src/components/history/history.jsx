import { Button, Dialog, ErrorBlock, NavBar, Popover } from "antd-mobile";
import { Workouts } from "./workouts";
import { DeleteOutline, MoreOutline } from "antd-mobile-icons";
import { useTheme } from "../../theme/theme-provider";

export const History = ({ workouts, onRemoveAll, onCreateNew }) => {
	const { theme } = useTheme();

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
						<Popover.Menu
							mode={theme}
							actions={actions}
							placement="bottom-start"
							trigger="click"
						>
							<MoreOutline />
						</Popover.Menu>
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
