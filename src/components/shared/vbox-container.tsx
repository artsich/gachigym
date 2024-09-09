import React from "react";
import { CSSProperties } from "react";

interface VBoxContainerProps {
	gap?: number;
	alignItems?: CSSProperties["alignItems"];
	children: React.ReactNode;
	childStyle?: CSSProperties;
}

export const VBoxContainer: React.FC<VBoxContainerProps> = ({
	gap,
	alignItems,
	children,
	childStyle,
}) => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: `${gap ?? 0}px`,
				alignItems,
				height: "100%",
				width: "100%",
			}}
		>
			{React.Children.map(children, (child, i) => (
				<div
					key={i}
					style={{
						flexGrow: "1",
						...(childStyle ?? {}),
					}}
				>
					{child}
				</div>
			))}
		</div>
	);
};
