import { useEffect, useState } from "react";
import { Button, Dialog, ErrorBlock, NavBar } from "antd-mobile";
import { Workouts } from "../components/history/workouts";
import { DeleteOutline, SetOutline } from "antd-mobile-icons";
import {
	getWorkouts,
	isWorkoutsExist,
	removeAllWorkouts,
	removeWorkout,
} from "../services/workout-service";
import { useNavigate } from "react-router-dom";
import { ThemedPopoverMenu } from "../components/shared/themed-popover-menu";

export const HistoryPage = () => {
	const navigate = useNavigate();

	const [workouts, setWorkouts] = useState<any[]>([]);

	const reload = () => {
		setWorkouts(getWorkouts());
	};

	useEffect(() => {
		reload();
	}, []);

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
						reload();
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
						<ThemedPopoverMenu
							actions={actions}
							placement="bottom-start"
							trigger="click"
						>
							<SetOutline />
						</ThemedPopoverMenu>
					</div>
				}
			>
				Past Workouts
			</NavBar>

			{isWorkoutsExist() ? (
				<Workouts
					workouts={workouts}
					onRemove={(id) => {
						removeWorkout(id);
						reload();
					}}
				/>
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
