import React, { useState } from "react";
import { List, Typography, Layout, Modal } from "antd";
import { getWorkouts, removeWorkout, saveProgram } from "../services/workout-service";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { OldWorkout } from "../components/old-workout/old-workout";

const { Content } = Layout;
const { Title } = Typography;

export const HistoryPage = () => {
	const [workouts, setWorkouts] = useState(getWorkouts());
	const [modal, contextHolder] = Modal.useModal();

	const handleRemoveWorkout = (id) => {
		modal.confirm({
			title: "Are you sure you want to delete it?",
			icon: <ExclamationCircleOutlined />,
			okText: "Yes",
			cancelText: "No",
			onOk: () => {
				removeWorkout(id);
				setWorkouts(getWorkouts());
			},
		});
	};

	return (
		<Layout>
			<Content style={{ padding: "50px" }}>
				<Title level={1} style={{ textAlign: "center" }}>
					Past Workouts
				</Title>
				<List
					itemLayout="vertical"
					dataSource={workouts}
					renderItem={(workout, _) => (
						<List.Item>
							<OldWorkout
								workout={workout}
								onSaveAsProgram={(program) => {
									saveProgram(program);
								}}
							/>
						</List.Item>
					)}
				/>
			</Content>
		</Layout>
	);
};
