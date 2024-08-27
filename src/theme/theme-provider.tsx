import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { Theme, getSettings } from "../services/settings";

interface ThemeContextType {
	theme: "dark" | "light";
	setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [themeFromSettings, setTheme] = useState<Theme>(
		() => getSettings().theme
	);
	const isSystemDark = useSystemThemeDetector();
	const currentTheme = useMemo(() => {
		if (themeFromSettings === "system") {
			return isSystemDark ? "dark" : "light";
		}
		return themeFromSettings;
	}, [themeFromSettings, isSystemDark]);

	useEffect(() => {
		document.documentElement.setAttribute(
			"data-prefers-color-scheme",
			currentTheme
		);
	}, [currentTheme]);

	return (
		<ThemeContext.Provider value={{ theme: currentTheme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

const useSystemThemeDetector = () => {
	const getCurrentTheme = () =>
		window.matchMedia("(prefers-color-scheme: dark)").matches;

	const [isDarkTheme, setIsDarkTheme] = useState(() => getCurrentTheme());

	const mqListener = (e: MediaQueryListEvent) => {
		setIsDarkTheme(e.matches);
	};

	useEffect(() => {
		const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
		darkThemeMq.addEventListener("change", mqListener);

		return () => {
			darkThemeMq.removeEventListener("change", mqListener);
		};
	}, []);

	return isDarkTheme;
};
