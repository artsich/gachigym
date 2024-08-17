import type { FC, ReactNode } from "react";
import "./index.css";

interface Props {
	title: string;
	padding?: string;
	background?: string;
	children?: ReactNode;
}

export const Block: FC<Props> = ({
	title,
	padding = "12px 12px",
	background = "var(--adm-color-background)",
	children,
}) => {
	return (
		<div className="demoBlock">
			<div className="title">{title}</div>
			<div
				className="main"
				style={{
					padding,
					background,
				}}
			>
				{children}
			</div>
		</div>
	);
};
