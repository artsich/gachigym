import { Dialog, NavBar, Radio, Space } from "antd-mobile";
import { MoreOutline, RedoOutline } from "antd-mobile-icons";
import { Block } from "../block";
import {
	Settings as AppSettings,
	Language,
	LanguageKeys,
	Theme,
	languageMap,
	themes,
} from "../../services/settings";
import { RadioValue } from "antd-mobile/es/components/radio";
import { ThemedPopoverMenu } from "../shared/themed-popover-menu";

export const Settings = ({
	appSettings,
	onLanguageChanged,
	onThemeChanged,
	onResetSettings,
}: {
	appSettings: AppSettings;
	onLanguageChanged: (lang: Language) => void;
	onThemeChanged: (theme: Theme) => void;
	onResetSettings: () => void;
}) => {
	const navBarActions = [
		{
			key: "clean",
			icon: <RedoOutline />,
			text: "Reset",
			onClick: () => {
				Dialog.confirm({
					title: "Reset settings?",
					onConfirm: onResetSettings,
				});
			},
		},
	];

	const handleLanguageChange = (val: RadioValue) => {
		if (Object.keys(languageMap).includes(val as string)) {
			onLanguageChanged(val as Language);
		} else {
			console.error("Unsupported language!");
		}
	};

	const handleThemeChange = (val: RadioValue) => {
		const theme = val as Theme;
		if (themes.includes(theme)) {
			onThemeChanged(theme);
		} else {
			console.error("Invalid theme value:", val);
		}
	};

	return (
		<>
			<NavBar
				style={{
					"--border-bottom": "1px #eee solid",
					marginBottom: "32px",
				}}
				backIcon={<></>}
				right={
					<div style={{ fontSize: 32 }}>
						<ThemedPopoverMenu
							actions={navBarActions}
							placement="bottom-start"
							trigger="click"
						>
							<MoreOutline />
						</ThemedPopoverMenu>
					</div>
				}
			>
				Application Settings
			</NavBar>
			<Block title="Language (works only with built-in antd strings)">
				<Radio.Group
					value={appSettings.lang}
					onChange={handleLanguageChange}
				>
					<Space direction="vertical">
						<Radio value={LanguageKeys.English}>English</Radio>
						<Radio value={LanguageKeys.Russian}>Russian</Radio>
					</Space>
				</Radio.Group>
			</Block>
			<Block title="Theme">
				<Radio.Group
					value={appSettings.theme}
					onChange={handleThemeChange}
				>
					<Space direction="vertical">
						<Radio value="system">System</Radio>
						<Radio value="light">Light</Radio>
						<Radio value="dark">Dark</Radio>
					</Space>
				</Radio.Group>
			</Block>
		</>
	);
};
