import { Footer } from "antd-mobile";
import { AppRoutes } from "./routes/app-routes";
import { ThemeProvider } from "./theme/theme-provider";
import { ConfigProvider } from "antd-mobile";
import { setDefaultConfig } from "antd-mobile";
import { useEffect } from "react";
import { getCurrentLanguageLocale } from "./services/settings";
import { VBoxContainer } from "./components/shared/vbox-container";

function footherContent() {
	const year = new Date().getFullYear();
	return `@ ${year} workout.tracker`;
}

export const App = () => {
	const locale = getCurrentLanguageLocale();

	useEffect(() => {
		// This shit is added because
		// https://mobile.ant.design/guide/i18n/#:~:text=FAQ-,Why%20the%20ConfigProvider%20not%20work%20when%20component%20used%20in%20an%20imperative%20way%3F,-Taking%20the%20Modal
		setDefaultConfig({
			locale: locale,
		});
	}, [locale]);

	return (
		<ConfigProvider locale={locale}>
			<ThemeProvider>
				<VBoxContainer gap={100}>
					<AppRoutes />
					<Footer content={footherContent()} />
				</VBoxContainer>
			</ThemeProvider>
		</ConfigProvider>
	);
};
