import React, {FunctionComponent} from "react";
import {View, Text} from "native-base";
import {ConfigHolder, GridList, Navigation, ThemedMarkdown} from "kitcheningredients";
import {MyStates} from "../states/MyStates";
import {TouchableOpacity} from "react-native";
import {MyButtonView} from "./MyButtonView";
import {MyFontSizes} from "./MyFontSizes";

export const MyHeading: FunctionComponent = (props) => {

    return (
        <Text fontSize={MyFontSizes.HEADING}>
            {props.children}
        </Text>
  );
}
