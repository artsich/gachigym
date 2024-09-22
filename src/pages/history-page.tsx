import { useCallback, useEffect, useState } from "react";
import { Button, Dialog, ErrorBlock, NavBar } from "antd-mobile";
import { Workouts } from "../components/history/workouts";
import { DeleteOutline, SetOutline } from "antd-mobile-icons";
import {
	getWorkoutsInRange,
	isWorkoutsExist,
	removeAllWorkouts,
	removeWorkout,
} from "../services/workout-service";
import { useNavigate } from "react-router-dom";
import { ThemedPopoverMenu } from "../components/shared/themed-popover-menu";
import { FilterByDate } from "../components/filter-by-date";

const startDateFromDateRange = new Date();
startDateFromDateRange.setMonth(startDateFromDateRange.getMonth() - 1);

export const HistoryPage = () => {
	const navigate = useNavigate();

	const [dateRangeOfWorkouts, setDateRangeOfWorkouts] = useState<{
		start: Date;
		end: Date;
	}>({ start: startDateFromDateRange, end: new Date() });

	const [workouts, setWorkouts] = useState<any[]>([]);

	const reload = useCallback(() => {
		setWorkouts(
			getWorkoutsInRange(
				dateRangeOfWorkouts.start,
				dateRangeOfWorkouts.end
			)
		);
	}, [dateRangeOfWorkouts]);

	useEffect(() => {
		reload();
	}, [reload]);

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
			<FilterByDate
				range={dateRangeOfWorkouts}
				onChangeDateRange={(range: any) => {
					setDateRangeOfWorkouts(range);
					reload();
				}}
			/>
			<div
				style={{
					borderBottom: "1px #eee solid",
					marginBottom: "32px",
				}}
			></div>
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
