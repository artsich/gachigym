export const themes = ["dark", "light", "system"] as const;
export type Theme = (typeof themes)[number];

export type Settings = {
	lang: string;
	theme: Theme;
};

export function applyTheme() {
	const settings = getSettings();
	let theme = settings.theme;

	if (theme === "system") {
		theme = "light"; // TODO: How to find system theme...?
	}

	document.documentElement.setAttribute(
		"data-prefers-color-scheme",
		theme
	);
}

export function updateSettings(settings: Settings) {
	localStorage.setItem("SETTINGS", JSON.stringify(settings));

	applyTheme();
}

export function getSettings(): Settings {
	const settingsJson = localStorage.getItem("SETTINGS");
	if (settingsJson) {
		return JSON.parse(settingsJson) as Settings;
	} else {
		return {
			lang: "eng",
			theme: "system",
		};
	}
}
