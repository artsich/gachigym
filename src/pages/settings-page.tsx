import { Radio, Space } from "antd-mobile";
import { Block } from "../components/block";
import { useState } from "react";
import { RadioValue } from "antd-mobile/es/components/radio";
import {
	Language,
	LanguageKeys,
	Settings,
	Theme,
	getSettings,
	setLanguage,
	themes,
	updateSettings,
} from "../services/settings";
import { useTheme } from "../theme/theme-provider";

// TODO: shitty code, please refactor it!!!
export const SettingsPage = () => {
	const { setTheme } = useTheme();

	const [settings, setSettings] = useState(getSettings());

	const updateAndSaveSettings = (newSettings: Partial<Settings>) => {
		const updatedSettings = { ...settings, ...newSettings };
		setSettings(updatedSettings);
		updateSettings(updatedSettings);
	};

	const changeLanguage = (val: RadioValue) => {
		updateAndSaveSettings({ lang: val as Language });
		if (val as Language) {
			setLanguage(val as Language);
		}
	};

	const changeTheme = (val: RadioValue) => {
		if (themes.includes(val as Theme)) {
			const theme = val as Theme;
			updateAndSaveSettings({ theme });
			setTheme(theme);
		} else {
			console.error("Invalid theme value:", val);
		}
	};

	return (
		<div style={{ padding: "32px" }}>
			<Block title="Language (works only with built-in antd strings)">
				<Radio.Group
					defaultValue={settings.lang}
					onChange={changeLanguage}
				>
					<Space direction="vertical">
						<Radio value={LanguageKeys.English}>English</Radio>
						<Radio value={LanguageKeys.Russian}>Russian</Radio>
					</Space>
				</Radio.Group>
			</Block>
			<Block title="Theme">
				<Radio.Group
					defaultValue={settings.theme}
					onChange={changeTheme}
				>
					<Space direction="vertical">
						<Radio value="system">System</Radio>
						<Radio value="light">Light</Radio>
						<Radio value="dark">Dark</Radio>
					</Space>
				</Radio.Group>
			</Block>
		</div>
	);
};
