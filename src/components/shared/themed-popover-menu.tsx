import React from "react";
import { Popover } from "antd-mobile";
import { PopoverMenuProps } from "antd-mobile/es/components/popover";
import { useTheme } from "../../theme/theme-provider";

interface ThemedPopoverMenuProps extends Omit<PopoverMenuProps, "mode"> {}

//TODO: by some reasone Popover.Menu does manage build-in theme.
export const ThemedPopoverMenu: React.FC<ThemedPopoverMenuProps> = (props) => {
	const { theme } = useTheme();
	return <Popover.Menu {...props} mode={theme} />;
};
