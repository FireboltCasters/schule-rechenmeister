// @ts-nocheck
import React, {useEffect, useState} from "react";
import {CrossLottie, Layout} from "kitcheningredients";
import {useBreakpointValue, View, Text} from "native-base";
import lottie from "../assets/animation_cat.json";
import Rectangle from "./Rectangle";

export const AnimationCat = ({children,...props}: any) => {

	const noFoundWidths = {
		base: "80%",
	}
	const noFoundWidth = useBreakpointValue(noFoundWidths);

	return (
		<View style={{width: "100%", alignItems: "center"}}>
			<View style={{width: noFoundWidth}}>
				<Rectangle aspectRatio={2/1}>
					<CrossLottie source={lottie} flex={1} />
				</Rectangle>
			</View>
		</View>
	)
}
