import { Button, Dialog, ErrorBlock, NavBar, Popover } from "antd-mobile";
import { Workouts } from "../components/history/workouts";
import { DeleteOutline, SetOutline } from "antd-mobile-icons";
import { useTheme } from "../theme/theme-provider";
import {
	isWorkoutsExist,
	removeAllWorkouts,
} from "../services/workout-service";
import { useNavigate } from "react-router-dom";

export const HistoryPage = () => {
	const { theme } = useTheme();
	const navigate = useNavigate();

	const actions = [
		{
			key: "clean",
			icon: <DeleteOutline />,
			text: "Clean history",
			onClick: () => {
				Dialog.confirm({
					title: "Remove all?",
					onConfirm: () => {
						removeAllWorkouts();
						navigate("/history");
					},
				});
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
					<div style={{ fontSize: 24 }}>
						<Popover.Menu
							mode={theme}
							actions={actions}
							placement="bottom-start"
							trigger="click"
						>
							<SetOutline />
						</Popover.Menu>
					</div>
				}
			>
				Past Workouts
			</NavBar>

			{isWorkoutsExist() ? (
				<Workouts />
			) : (
				<ErrorBlock title="No workouts" description="" status="empty">
					<Button
						color="primary"
						onClick={() => navigate("/workout")}
					>
						Create new
					</Button>
				</ErrorBlock>
			)}
		</div>
	);
};
