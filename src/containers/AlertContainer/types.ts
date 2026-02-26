import type { ColorValue, StyleProp, ViewStyle } from "react-native";
import type {
	AlertButton,
	Props as AlertProps,
	AlertViewProps,
	ConfettiProps,
	ConfirmProps,
} from "../../components/Alert/types";

export type Alert = {
	clearQueue: (hideDisplayedAlert?: boolean) => void;
	confirm: (alert?: ConfirmProps) => Promise<boolean>;
	error: <R = unknown>(error: Error) => Promise<R>;
	getAlertData: <R = unknown>(id: string) => AlertProps<R> | undefined;
	hide: () => void;
	isShown: boolean;
	show: <R = unknown>(alert: AlertProps<R>) => Promise<R>;
	success: <R = unknown>(alert: AlertProps<R>) => Promise<R>;
	update: <R = unknown>(id: string, alert: AlertProps<R>) => void;
};

export type CurrentAlert = AlertProps &
	Pick<AlertViewProps, "resolve"> &
	Pick<Props, "config">;

export type { AlertProps };

export type Props = {
	animationDuration?: number;
	config?: AlertConfig;
};

export type AlertConfig = {
	testID?: string;
	backdrop?: {
		backgroundColor?: ColorValue;
		children?: React.ReactNode;
	};
	success?: Partial<
		Pick<AlertProps, "icon" | "iconColor" | "iconSize" | "title">
	>;
	error?: Partial<
		Pick<AlertProps, "icon" | "iconColor" | "iconSize" | "title">
	>;
	confirm?: Partial<
		Pick<AlertProps, "icon" | "iconColor" | "iconSize" | "title">
	> & {
		buttons?: Pick<AlertButton, "text" | "customProps">[];
	};
	icon?: {
		size?: number;
		color?: ColorValue;
	};
	alertStyle?: StyleProp<ViewStyle>;
	confetti?: ConfettiProps;
	renderTitle?: AlertViewProps["renderTitle"];
	renderMessage?: AlertViewProps["renderMessage"];
	renderDismissButton?: AlertViewProps["renderDismissButton"];
	afterButtonsSlot?: AlertViewProps["afterButtonsSlot"];
	beforeButtonsSlot?: AlertViewProps["beforeButtonsSlot"];
	beforeMessageSlot?: AlertViewProps["beforeMessageSlot"];
	beforeTitleSlot?: AlertViewProps["beforeTitleSlot"];
	buttons?: {
		gap?: number;
		render?: AlertViewProps["renderButton"];
		default?: Pick<AlertButton, "text" | "testID">;
	};
};
