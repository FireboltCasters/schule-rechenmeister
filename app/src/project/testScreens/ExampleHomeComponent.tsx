import React, {FunctionComponent} from "react";
import {Text, View} from "native-base";
import {ConfigHolder, Navigation} from "kitcheningredients";
import {TouchableOpacity} from "react-native";
import {SelectAmountPlayersScreen} from "../screens/SelectAmountPlayersScreen";
import {MyButton} from "../components/MyButton";
import {MySpacer} from "../components/MySpacer";

export const ExampleHomeComponent: FunctionComponent = (props) => {

    if(!ConfigHolder.instance.isDrawerHidden()){
        ConfigHolder.instance.setHideDrawer(true, Navigation.DEFAULT_ROUTE_HOME);
    }

  return (
    <View style={{width: "100%"}}>
        <View style={{width: "100%", alignItems: "center"}}><Text>{"Wer wird Kopfrechenmeister?"}</Text></View>
        <MySpacer />
        <MySpacer />
        <MySpacer />
        <MyButton onPress={() => {
            Navigation.navigateTo(SelectAmountPlayersScreen);
        }}>
            <Text>{"Start"}</Text>
        </MyButton>
    </View>
  );
}
