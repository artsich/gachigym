import { Modal } from "antd-mobile";
import { useEffect } from "react";
import { useBlocker } from "react-router-dom";

const useNavigationBlocker = (when: boolean) => {
	useEffect(() => {
		const handleBeforeUnload = (event: BeforeUnloadEvent) => {
			if (when) {
				const message =
					"You have unsaved changes. Are you sure you want to leave?";
				event.preventDefault();
				return message;
			}
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, [when]);
};

export const RouterBlocker = ({
	when,
	title,
}: {
	when: boolean;
	title: string;
}) => {
	let blocker = useBlocker(
		({ currentLocation, nextLocation }) =>
			when && currentLocation.pathname !== nextLocation.pathname
	);

	useNavigationBlocker(true);

	return (
		<Modal
			visible={blocker.state === "blocked"}
			content={title}
			closeOnAction
			onAction={(a) => {
				if (a.key === "leave" && blocker.proceed) {
					blocker.proceed();
				} else if (a.key === "stay" && blocker.reset) {
					blocker.reset();
				}
			}}
			actions={[
				{
					key: "leave",
					text: "Leave",
				},
				{
					key: "stay",
					text: "Stay",
				},
			]}
		/>
	);
};
