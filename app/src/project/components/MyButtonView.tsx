import React, {FunctionComponent} from "react";
import {View, Text} from "native-base";
import {ConfigHolder, GridList, MyThemedBox, Navigation, ThemedMarkdown} from "kitcheningredients";
import {MyStates} from "../states/MyStates";
import {TouchableOpacity} from "react-native";

export const MyButtonView: FunctionComponent = (props) => {

    const style ={borderRadius: "10px", overflow: "hidden", width: "100%"}
    const propStyle = props?.style || {};

    const customColor = propStyle?.backgroundColor;

    const content = customColor ? (
        <View style={{padding: "5px", justifyContent: "center", alignItems: "center"}}>
            {props.children}
        </View>
    ) : (
        <MyThemedBox _shadeLevel={3}>
            <View style={{padding: "5px", justifyContent: "center", alignItems: "center"}}>
                {props.children}
            </View>
        </MyThemedBox>
    )

    return (
        <View style={{...style, ...propStyle}}>
            {content}
        </View>
  );
}
