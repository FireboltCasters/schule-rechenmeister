import React, {FunctionComponent} from "react";
import {View, Text} from "native-base";
import {ConfigHolder, GridList, Navigation, ThemedMarkdown} from "kitcheningredients";
import {MyStates} from "../states/MyStates";
import {TouchableOpacity} from "react-native";
import {MyButtonView} from "./MyButtonView";

export const MyButton: FunctionComponent = (props) => {

    return (
        <TouchableOpacity onPress={() => {
            if(props?.onPress){
                props.onPress();
            }
        }}>
            <MyButtonView style={props?.style}>
                {props.children}
            </MyButtonView>
        </TouchableOpacity>
  );
}
