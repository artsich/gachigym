import { setDefaultConfig } from "antd-mobile";
import enUS from "antd-mobile/es/locales/en-US";
import ruRU from "antd-mobile/es/locales/ru-RU";

export const themes = ["dark", "light", "system"] as const;

export enum LanguageKeys {
    English = "english",
    Russian = "russian",
}

export const languageMap = {
	[LanguageKeys.English]: enUS,
	[LanguageKeys.Russian]: ruRU,
};

export type Language = keyof typeof languageMap
export type Theme = typeof themes[number];

export type Settings = {
	lang: Language;
	theme: Theme;
};

export const defaultSettings: Settings = {
	lang: LanguageKeys.English,
	theme: "system",
};

export function setLanguage(lang: Language): void {
	setDefaultConfig({
		locale: languageMap[lang],
	});
}

export function getCurrentLanguageLocale(): typeof enUS | typeof ruRU {
	return languageMap[getSettings().lang];
}

export function updateSettings(settings: Settings): void {
	localStorage.setItem("SETTINGS", JSON.stringify(settings));
}

export function getSettings(): Settings {
	const settingsJson = localStorage.getItem("SETTINGS");
	if (settingsJson) {
		return JSON.parse(settingsJson) as Settings;
	} else {
		return defaultSettings;
	}
}
