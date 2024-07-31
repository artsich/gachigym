import React from "react";
import { Avatar, Divider, Row, Col } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { CapsuleTabs, IndexBar, List, Grid, Badge, Space } from "antd-mobile";

export const OldWorkout = ({ workout }) => {
	const styles = {
		box: {
			backgroundColor: "lightgrey",
			width: "60px",
			border: "2px solid green",
			height: "50px"
		},
	};

	return (
		<>
			<Row>
				<Grid columns={4} gap={18}>
					<Grid.Item span={3} >
						<div>
							ОЧЕНЬ ДЛИННОЕ название тренировки в пятницу или
							среду
						</div>
					</Grid.Item>
					<Grid.Item span={1}>
						<Space direction="vertical" justify="center">
							<span
								style={{
									fontSize: "bold 16px",
								}}
							>
								{new Date(
									workout.startTime
								).toLocaleDateString()}
							</span>
							<span
								style={{
									font: "small-caps bold 14px sans-serif",
								}}
							>
								2 H 11 m
							</span>
						</Space>
					</Grid.Item>
				</Grid>

				<CapsuleTabs defaultActiveKey="1">
					<CapsuleTabs.Tab title="Espresso" key="1">
						<Grid columns={4} gap={40}>
							<Grid.Item >
								<Badge content="5" bordered >
									<div style={styles.box}>50 kg</div>
								</Badge>
							</Grid.Item>
							<Grid.Item>
								<Badge content="5" bordered>
									<div style={styles.box}>AAA</div>
								</Badge>
							</Grid.Item>
							<Grid.Item>
								<Badge content="5" bordered>
									<div style={styles.box}>AAA</div>
								</Badge>
							</Grid.Item>
							<Grid.Item>
								<Badge content="5" bordered>
									<div style={styles.box}>AAA</div>
								</Badge>
							</Grid.Item>
							<Grid.Item>
								<Badge content="5" bordered>
									<div style={styles.box}>AAA</div>
								</Badge>
							</Grid.Item>
							<Grid.Item>
								<Badge content="5" bordered>
									<div style={styles.box}>AAA</div>
								</Badge>
							</Grid.Item>
						</Grid>
					</CapsuleTabs.Tab>
					<CapsuleTabs.Tab title="Coffee Latte" key="2">
						2
					</CapsuleTabs.Tab>
					<CapsuleTabs.Tab title="Cappuccino" key="3">
						3
					</CapsuleTabs.Tab>
					<CapsuleTabs.Tab title="Cappuccino" key="4">
						4
					</CapsuleTabs.Tab>
					<CapsuleTabs.Tab title="Cappuccino" key="5">
						5
					</CapsuleTabs.Tab>
				</CapsuleTabs>
			</Row>
			<Divider />
			<Row align="middle" justify="space-between">
				<div>Воскресение тренировка 24.07.2024</div>
				<CapsuleTabs defaultActiveKey="1">
					<CapsuleTabs.Tab title="Espresso" key="1">
						1
					</CapsuleTabs.Tab>
					<CapsuleTabs.Tab title="Coffee Latte" key="2">
						2
					</CapsuleTabs.Tab>
				</CapsuleTabs>
			</Row>
			{/* InfiniteScroll */}
		</>
	);
};
