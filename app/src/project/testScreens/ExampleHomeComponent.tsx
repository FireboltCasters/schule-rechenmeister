import React, {FunctionComponent} from "react";
import {Text, View} from "native-base";
import {ConfigHolder, Navigation} from "kitcheningredients";
import {SelectAmountPlayersScreen} from "../screens/SelectAmountPlayersScreen";
import {MyButton} from "../components/MyButton";
import {MySpacer} from "../components/MySpacer";
import {MyHeading} from "../components/MyHeading";
import {AnimationKing} from "../animations/AnimationKing";

export const ExampleHomeComponent: FunctionComponent = (props) => {

    if(!ConfigHolder.instance.isDrawerHidden()){
        ConfigHolder.instance.setHideDrawer(true, Navigation.DEFAULT_ROUTE_HOME);
    }

  return (
    <View style={{width: "100%"}}>
        <View style={{width: "100%", alignItems: "center"}}><MyHeading>{"Wer wird Kopfrechenmeister?"}</MyHeading></View>
        <AnimationKing />
        <MyButton onPress={() => {
            Navigation.navigateTo(SelectAmountPlayersScreen);
        }}>
            <Text fontSize={"6xl"}>{"Start"}</Text>
        </MyButton>
    </View>
  );
}
