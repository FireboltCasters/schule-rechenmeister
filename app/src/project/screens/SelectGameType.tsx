import React, {FunctionComponent} from "react";
import {Input, Text, View} from "native-base";
import {ConfigHolder, GridList, Navigation} from "kitcheningredients";
import {MyStates} from "../states/MyStates";
import {MyButton} from "../components/MyButton";
import {MyButtonView} from "../components/MyButtonView";

export const SelectGameType: FunctionComponent = (props) => {

  return (
    <View style={{width: "100%"}}>
        <View style={{width: "100%", alignItems: "center"}}><Text>{"Wähle dein Spiel"}</Text></View>
        <GridList>

        </GridList>
    </View>
  );
}
