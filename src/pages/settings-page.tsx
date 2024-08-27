import { useState } from "react";
import {
	Language,
	Settings,
	Theme,
	defaultSettings,
	getSettings,
	setLanguage,
	updateSettings,
} from "../services/settings";
import { useTheme } from "../theme/theme-provider";
import { Settings as SettingsComponent } from "../components/settings/settings";

export const SettingsPage = () => {
	const { setTheme } = useTheme();
	const [settings, setSettings] = useState(() => getSettings());

	const updateAppSettings = (updatedSettings: Settings) => {
		setSettings(updatedSettings);
		updateSettings(updatedSettings);

		if (settings.lang !== updatedSettings.lang) {
			setLanguage(updatedSettings.lang);
		}
		if (settings.theme !== updatedSettings.theme) {
			setTheme(updatedSettings.theme);
		}
	};

	const updateSettingsFields = (newSettings: Partial<Settings>) => {
		const updatedSettings = { ...settings, ...newSettings };
		updateAppSettings(updatedSettings);
	};

	const handleLanguageChange = (lang: Language) => {
		updateSettingsFields({ lang });
	};

	const handleThemeChange = (theme: Theme) => {
		updateSettingsFields({ theme });
	};

	const handleResetSettings = () => {
		updateAppSettings(defaultSettings);
	};

	return (
		<SettingsComponent
			appSettings={settings}
			onLanguageChanged={handleLanguageChange}
			onThemeChanged={handleThemeChange}
			onResetSettings={handleResetSettings}
		/>
	);
};
