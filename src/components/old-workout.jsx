import React from "react";
import { CapsuleTabs, Grid, Space, Divider } from "antd-mobile";
import { Row } from 'antd';

export const OldWorkout = ({ workout }) => {
	const styles = {
		badge: {
			position: "relative",
			width: "40px",
			height: "40px",
			borderRadius: "20%",
			backgroundColor: "rgb(21,96,189)",
			fontFamily: "Roboto, Arial, sans-serif",
			fontSize: "24px",
			fontWeight: "bold"
		},

		badgeWeight: {
			position: "absolute",
			top: "20%",
			left: "16%",
			color: "rgb(245,245,245)"
		},

		badgeReps: {
			position: "absolute",
			top: "-20%",
			right: "-20%",
			fontSize: ".4em",
			color: "rgb(245,245,245)",
			width: "2.8em",
			height: "2em",
			lineHeight: "2em",
  			textAlign: "center",
			border: "1px solid white",
			borderRadius: "50%",
			background: "red"
		},

		badgeLabelKG: {
			position: "absolute",
			top: "50%",
			right: "-30%",
			writingMode: "vertical-rl",
			transform: "scale(-1)",
			fontSize: ".5em"
		}
	};

	const example = {}
	return (
		<>
			<Row direction="vertical">
				<Grid columns={4} gap={18}>
					<Grid.Item span={3}>
						<div>
							ОЧЕНЬ ДЛИННОЕ название тренировки в пятницу или
							среду
						</div>
					</Grid.Item>
					<Grid.Item span={1}>
						<Row direction="vertical" justify="center">
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
						</Row>
					</Grid.Item>
				</Grid>

				<CapsuleTabs defaultActiveKey="1">
					<CapsuleTabs.Tab title="Espresso" key="1">
						<Grid columns={5} gap={1}>
							<Grid.Item>
								<div style={styles.badge}>
									<div style={styles.badgeWeight}>50</div>
									<div style={styles.badgeReps}>x 20</div>
									<div style={styles.badgeLabelKG}>KG</div>
								</div>
							</Grid.Item>
							<Grid.Item>
								<div style={styles.badge}>
									<div style={styles.badgeWeight}>50</div>
									<div style={styles.badgeReps}>x 150</div>
									<div style={styles.badgeLabelKG}>KG</div>
								</div>
							</Grid.Item>
							<Grid.Item>
								<div style={styles.badge}>
									<div style={styles.badgeWeight}>50</div>
									<div style={styles.badgeReps}>x 30</div>
									<div style={styles.badgeLabelKG}>KG</div>
								</div>
							</Grid.Item>
							<Grid.Item>
								<div style={styles.badge}>
									<div style={styles.badgeWeight}>50</div>
									<div style={styles.badgeReps}>x 99</div>
									<div style={styles.badgeLabelKG}>KG</div>
								</div>
							</Grid.Item>
							<Grid.Item>
								<div style={styles.badge}>
									<div style={styles.badgeWeight}>50</div>
									<div style={styles.badgeReps}>x 10</div>
									<div style={styles.badgeLabelKG}>KG</div>
								</div>
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
			<Row align="middle" justify="Row-between">
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
