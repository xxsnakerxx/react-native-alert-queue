import { useEffect, useRef } from "react";
import { useSharedValue, withTiming } from "react-native-reanimated";

export const useAnimation = ({
	animationDuration,
	isHiding,
}: {
	animationDuration: number;
	isHiding: boolean;
}) => {
	const animation = useSharedValue(isHiding ? 1 : 0);
	const prevIsHidingRef = useRef<boolean>(null);

	useEffect(() => {
		if (isHiding !== prevIsHidingRef.current) {
			animation.value = withTiming(isHiding ? 0 : 1, {
				duration: animationDuration,
			});
		}
		prevIsHidingRef.current = isHiding;
	}, [isHiding, animationDuration, animation]);

	return { animation };
};
