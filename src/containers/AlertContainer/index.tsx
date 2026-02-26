import { type FC, useCallback, useEffect, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Alert } from "../../components/Alert";
import { Backdrop } from "../../components/Backdrop";
import { ConfettiContainer } from "../ConfettiContainer";
import { alert } from "./alert.api";
import { useController } from "./controller";
import { styles } from "./styles";
import type { Props } from "./types";

export const AlertContainer: FC<Props> = ({
	animationDuration = 200,
	config,
}) => {
	const {
		bottomOffset,
		clearQueue,
		confirm,
		currentAlert,
		getAlertData,
		hide,
		isHiding,
		isShown,
		show,
		showError,
		success,
		update,
	} = useController({ animationDuration, config });

	useEffect(() => {
		// @ts-expect-error: Type 'unknown' is not assignable to type 'R'
		alert.show = show;
		alert.hide = hide;
		// @ts-expect-error: Type 'unknown' is not assignable to type 'R'
		alert.success = success;
		alert.update = update;
		alert.clearQueue = clearQueue;
		// @ts-expect-error: Type 'unknown' is not assignable to type 'R'
		alert.getAlertData = getAlertData;
		// @ts-expect-error: Type 'unknown' is not assignable to type 'R'
		alert.confirm = confirm;
		// @ts-expect-error: Type 'unknown' is not assignable to type 'R'
		alert.error = showError;
		alert.isShown = isShown;
	}, [
		clearQueue,
		hide,
		show,
		success,
		update,
		getAlertData,
		isShown,
		confirm,
		showError,
	]);

	const containerStyle = useMemo(
		() =>
			StyleSheet.compose(styles.container, {
				bottom: bottomOffset,
			}),
		[bottomOffset],
	);

	const renderConfetti = useCallback(() => {
		const shouldRender = currentAlert?.confetti;

		if (shouldRender) {
			const currentAlertConfettiProps =
				typeof currentAlert.confetti === "boolean"
					? undefined
					: currentAlert.confetti;

			const globalProps = config?.confetti;

			const confettiProps = {
				...globalProps,
				...currentAlertConfettiProps,
			};

			return <ConfettiContainer {...confettiProps} />;
		}

		return null;
	}, [currentAlert?.confetti, config?.confetti]);

	return currentAlert ? (
		<View style={containerStyle}>
			<Backdrop
				animationDuration={animationDuration}
				isHiding={isHiding}
				backgroundColor={config?.backdrop?.backgroundColor}
			>
				{config?.backdrop?.children}
			</Backdrop>
			{renderConfetti()}
			<Alert
				{...currentAlert}
				animationDuration={animationDuration}
				isHiding={isHiding}
			/>
		</View>
	) : null;
};
