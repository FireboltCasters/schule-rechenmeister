// @ts-nocheck
import React, {useEffect, useState} from "react";
import {CrossLottie, Layout} from "kitcheningredients";
import {useBreakpointValue, View, Text} from "native-base";
import lottie from "../assets/animation_correct.json";
import Rectangle from "./Rectangle";

export const AnimationCorrect = ({children,...props}: any) => {

	const noFoundWidths = {
		base: "70%",
		sm: "50%",
		md: Layout.WIDTH_MD*0.5,
		lg: Layout.WIDTH_LG*0.5,
		xl: Layout.WIDTH_XL*0.5
	}
	const noFoundWidth = useBreakpointValue(noFoundWidths);

	return (
		<View style={{width: "100%", alignItems: "center"}}>
			<View style={{width: noFoundWidth}}>
				<Rectangle aspectRatio={1}>
					<CrossLottie source={lottie} flex={1} autoPlay={true} />
				</Rectangle>
			</View>
		</View>
	)
}
