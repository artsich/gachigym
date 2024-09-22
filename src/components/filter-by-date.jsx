import { AutoCenter, Button, DatePicker, Grid, Toast } from "antd-mobile";
import { GridItem } from "antd-mobile/es/components/grid/grid";
import { useState } from "react";

export const FilterByDate = ({ range, onChangeDateRange }) => {
	const [visible, setVisible] = useState(false);
	const [currentButton, setCurrentButton] = useState();

	return (
		<div style={{ margin: "14px" }}>
			<h4 style={{ margin: "5px" }}>Period</h4>
			<AutoCenter>
				<Grid columns={9} gap={20}>
					<GridItem span={4}>
						<Button
							size="small"
							onClick={() => {
								setVisible(true);
								setCurrentButton("start");
							}}
						>
							{range?.start?.toLocaleDateString("en-GB")}
						</Button>
					</GridItem>
					<div style={{paddingTop: "5px"}}>-</div>
					<GridItem span={4}>
						<Button
							size="small"
							onClick={() => {
								setVisible(true);
								setCurrentButton("end");
							}}
						>
							{range?.end?.toLocaleDateString("en-GB")}
						</Button>
					</GridItem>
				</Grid>
			</AutoCenter>
			<DatePicker
				title={currentButton}
				visible={visible}
				value={currentButton === "start"? range.start : range.end}
				onClose={() => {
					setVisible(false);
				}}
				onConfirm={(val) => {
					currentButton === "start"? range.start = val : range.end = val;
					onChangeDateRange(range);
					Toast.show(val?.toLocaleDateString("en-GB"));
				}}
			/>
		</div>
	);
};
