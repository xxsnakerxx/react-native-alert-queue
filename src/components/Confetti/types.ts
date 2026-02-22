import type { ReactElement } from "react";
import type { StyleProp, ViewStyle } from "react-native";

export type Props = {
	colors?: string[];
	height?: number;
	numberOfPieces?: number;
	opacity?: number;
	pieceDimensions?: {
		height: number;
		width: number;
	};
	renderPiece?: (props: { style: StyleProp<ViewStyle> }) => ReactElement;
	width?: number;
	startOffset?: number;
};

export type ConfettiPieceConfig = {
	angle: number;
	angleVel: number;
	color: string;
	delay: number;
	elasticity: number;
	key: number;
	x: number;
	xVel: number;
	y: number;
	yVel: number;
};

export type ConfettiPieceProps = ConfettiPieceConfig &
	Pick<Props, "opacity" | "pieceDimensions" | "renderPiece" | "startOffset"> & {
		canvasHeight: number;
		canvasWidth: number;
	};
