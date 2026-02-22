import { useCallback } from "react";

export const usePlatformController = () => {
	const onShow = useCallback(() => {}, []);

	const onHide = useCallback(() => {}, []);

	return { bottomOffset: 0, onHide, onShow };
};
