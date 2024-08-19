import { Footer } from "antd-mobile";
import { AppRoutes } from "./routes/app-routes";
import { ThemeProvider } from "./theme/theme-provider";

function footherContent() {
	const year = new Date().getFullYear();
	return `@ ${year} gachy.tracker All rights reserved`;
}

export const App = () => {
	return (
		<ThemeProvider>
			<AppRoutes />
			<Footer content={footherContent()} />
		</ThemeProvider>
	);
};
