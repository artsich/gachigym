import { Radio, Space } from "antd-mobile";
import { Block } from "../components/block";
import { useState } from "react";
import { RadioValue } from "antd-mobile/es/components/radio";
import {
	Settings,
	Theme,
	getSettings,
	themes,
	updateSettings,
} from "../services/settings";

export const SettingsPage = () => {
	const [settings, setSettings] = useState(getSettings());

	const updateAndSaveSettings = (newSettings: Partial<Settings>) => {
		const updatedSettings = { ...settings, ...newSettings };
		setSettings(updatedSettings);
		updateSettings(updatedSettings);
	};

	const changeLanguage = (val: RadioValue) => {
		updateAndSaveSettings({ lang: val as string });
	};

	const changeTheme = (val: RadioValue) => {
		if (themes.includes(val as Theme)) {
			const theme = val as Theme;
			updateAndSaveSettings({ theme });
		} else {
			console.error("Invalid theme value:", val);
		}
	};

	return (
		<div style={{ padding: "32px" }}>
			<Block title="Language">
				<Radio.Group
					defaultValue={settings.lang}
					onChange={changeLanguage}
				>
					<Space direction="vertical">
						<Radio value="eng">English</Radio>
						<Radio value="rus">Russian</Radio>
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
