import React from "react";
import { Popover } from "antd-mobile";
import { PopoverProps } from "antd-mobile/es/components/popover";
import { useTheme } from "../../theme/theme-provider";

interface ThemedPopoverProps extends Omit<PopoverProps, "mode"> {}

//TODO: by some reasone Popover does manage build-in theme.
export const ThemedPopover: React.FC<ThemedPopoverProps> = (props) => {
	const { theme } = useTheme();
	return <Popover {...props} mode={theme} />;
};
