import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { Theme, getSettings } from "../services/settings";

interface ThemeContextType {
	theme: Theme;
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
	const [theme, setTheme] = useState<Theme>(getSettings().theme);
	const isSystemDark = useSystemThemeDetector();

	useEffect(() => {
		let desiredTheme = theme;
		if (desiredTheme === "system") {
			desiredTheme = isSystemDark ? "dark" : "light";
		}

		document.documentElement.setAttribute(
			"data-prefers-color-scheme",
			desiredTheme
		);
	}, [theme, isSystemDark]);

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
