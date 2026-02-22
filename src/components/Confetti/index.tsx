import { type FC, useMemo } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import Animated, { FadeOutDown } from "react-native-reanimated";
import { COLORS } from "./constants";
import { useWaitForAnimations } from "./hooks/useWaitForAnimations";
import { ConfettiPiece } from "./Piece";
import type { ConfettiPieceConfig, Props } from "./types";

export const Confetti: FC<Props> = ({
	colors = COLORS,
	numberOfPieces = 150,
	opacity = 1,
	renderPiece,
	startOffset = 50,
	...rest
}) => {
	const { height: screenHeight, width: screenWidth } = useWindowDimensions();
	const isReady = useWaitForAnimations();

	const pieceDimensions = useMemo(() => {
		return (
			rest.pieceDimensions || {
				height: 10,
				width: 20,
			}
		);
	}, [rest.pieceDimensions]);

	const width = useMemo(() => {
		return rest.width || screenWidth;
	}, [rest.width, screenWidth]);

	const height = useMemo(() => {
		return rest.height || screenHeight;
	}, [rest.height, screenHeight]);

	const xVelMax = 400;
	const yVelMax = 150;
	const angleVelMax = 15;

	const confetti: ConfettiPieceConfig[] = useMemo(
		() =>
			[...new Array(numberOfPieces)].map((_, index) => {
				return {
					angle: 0,
					angleVel: (Math.random() * angleVelMax - angleVelMax / 2) * Math.PI,
					color: colors[index % colors.length] || "#000",
					delay: Math.floor(index / 10) * 0.2,
					elasticity: Math.random() * 0.9 + 0.1,
					key: index,
					x: Math.random() * width - (pieceDimensions.width || 20) / 2,
					xVel: Math.random() * xVelMax - xVelMax / 2,
					y: -startOffset, // Start above the screen
					yVel: Math.random() * yVelMax + yVelMax,
				};
			}),
		[colors, numberOfPieces, pieceDimensions, width, startOffset],
	);

	if (!isReady) {
		return null;
	}

	return (
		<Animated.View
			pointerEvents="none"
			style={StyleSheet.absoluteFill}
			exiting={FadeOutDown}
		>
			{confetti.map((c) => {
				return (
					<ConfettiPiece
						{...c}
						canvasHeight={height}
						canvasWidth={width}
						key={c.key}
						opacity={opacity}
						pieceDimensions={pieceDimensions}
						renderPiece={renderPiece}
					/>
				);
			})}
		</Animated.View>
	);
};
