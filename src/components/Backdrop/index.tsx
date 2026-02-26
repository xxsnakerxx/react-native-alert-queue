import { type FC, type PropsWithChildren, useMemo } from "react";
import { StyleSheet } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { useAnimation } from "../../hooks/useAnimation";
import type { Props } from "./types";

export const Backdrop: FC<PropsWithChildren<Props>> = ({
	animationDuration,
	isHiding,
	backgroundColor = "rgba(0, 0, 0, 0.5)",
	children,
}) => {
	const { animation } = useAnimation({ animationDuration, isHiding });

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: animation.value,
	}));

	const style = useMemo(
		() =>
			StyleSheet.compose(
				StyleSheet.absoluteFillObject,
				StyleSheet.compose(animatedStyle, { backgroundColor }),
			),
		[animatedStyle, backgroundColor],
	);

	return <Animated.View style={style}>{children}</Animated.View>;
};
