import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
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

const useSystemThemeDetector = () => {
	const getCurrentTheme = () =>
		window.matchMedia("(prefers-color-scheme: dark)").matches;

	const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme());

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

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [themeFromSettings, setTheme] = useState(getSettings().theme);
	const [currentTheme, setCurrentTheme] = useState<"dark" | "light">("light");
	const isSystemDark = useSystemThemeDetector();

	useEffect(() => {
		let desiredTheme = themeFromSettings;
		if (desiredTheme === "system") {
			desiredTheme = isSystemDark ? "dark" : "light";
		}

		setCurrentTheme(desiredTheme);
		document.documentElement.setAttribute(
			"data-prefers-color-scheme",
			desiredTheme
		);
	}, [themeFromSettings, isSystemDark]);

	return (
		<ThemeContext.Provider value={{ theme: currentTheme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
