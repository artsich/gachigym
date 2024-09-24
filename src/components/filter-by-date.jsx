import { AutoCenter, Button, DatePicker, Grid, Toast } from "antd-mobile";
import { GridItem } from "antd-mobile/es/components/grid/grid";
import { useState } from "react";

export const FilterByDate = ({ range, onChangeDateRange }) => {
	const [visible, setVisible] = useState(false);
	const [currentButton, setCurrentButton] = useState();

	return (
		<div style={{ margin: "14px 4px" }}>
			<h4 style={{ margin: "5px" }}>Period</h4>
			<AutoCenter>
				<Grid columns={9} gap={5}>
					<GridItem span={4}>
						<Button
							size="small"
							style={{ fontSize: "14px", width: "100%" }}
							onClick={() => {
								setVisible(true);
								setCurrentButton("Start");
							}}
						>
							{range?.start?.toDateString("en-US")}
						</Button>
					</GridItem>
					<AutoCenter>
						<div style={{ padding: "4px" }}>-</div>
					</AutoCenter>
					<GridItem span={4}>
						<Button
							size="small"
							style={{ fontSize: "14px", width: "100%" }}
							onClick={() => {
								setVisible(true);
								setCurrentButton("End");
							}}
						>
							{range?.end?.toDateString("en-US")}
						</Button>
					</GridItem>
				</Grid>
			</AutoCenter>
			<DatePicker
				title={currentButton}
				visible={visible}
				max={new Date()}
				value={currentButton === "Start" ? range.start : range.end}
				onClose={() => {
					setVisible(false);
				}}
				onConfirm={(val) => {
					if (currentButton === "Start") range.start = val;
					else range.end = val;
					onChangeDateRange(range);
					Toast.show(val?.toLocaleDateString("en-GB"));
				}}
			/>
		</div>
	);
};
