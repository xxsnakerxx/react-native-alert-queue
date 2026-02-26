import { useCallback, useRef, useState } from "react";
import type { KeyboardEvent, NativeEventSubscription } from "react-native";
import {
	BackHandler,
	Keyboard,
	LayoutAnimation,
	Platform,
	TextInput,
} from "react-native";

export const usePlatformController = () => {
	const [keyboardHeight, setKeyboardHeight] = useState(0);

	const onKeyboardDidShow = useCallback((e: KeyboardEvent) => {
		LayoutAnimation.easeInEaseOut();

		setKeyboardHeight(e.endCoordinates.height);
	}, []);

	const onKeyboardDidHide = useCallback(() => {
		LayoutAnimation.easeInEaseOut();

		setKeyboardHeight(0);
	}, []);

	const focusedTextInput =
		useRef<ReturnType<(typeof TextInput)["State"]["currentlyFocusedInput"]>>(
			null,
		);

	const androidBackButtonPressSub = useRef<NativeEventSubscription>(null);

	const keyboardDidShowSub =
		useRef<ReturnType<(typeof Keyboard)["addListener"]>>(null);

	const keyboardDidHideSub =
		useRef<ReturnType<(typeof Keyboard)["addListener"]>>(null);

	const onShow = useCallback(() => {
		focusedTextInput.current = TextInput.State.currentlyFocusedInput();
		TextInput.State.blurTextInput(focusedTextInput.current);

		if (Platform.OS === "android") {
			androidBackButtonPressSub.current = BackHandler.addEventListener(
				"hardwareBackPress",
				() => {
					return true;
				},
			);
		}

		keyboardDidShowSub.current = Keyboard.addListener(
			"keyboardDidShow",
			onKeyboardDidShow,
		);

		keyboardDidHideSub.current = Keyboard.addListener(
			"keyboardDidHide",
			onKeyboardDidHide,
		);
	}, [onKeyboardDidHide, onKeyboardDidShow]);

	const onHide = useCallback(() => {
		if (focusedTextInput.current) {
			TextInput.State.focusTextInput(focusedTextInput.current);
		}

		if (Platform.OS === "android") {
			androidBackButtonPressSub.current?.remove();
		}

		keyboardDidShowSub.current?.remove();
		keyboardDidHideSub.current?.remove();

		setKeyboardHeight(0);
	}, []);

	return { bottomOffset: keyboardHeight, onHide, onShow };
};
