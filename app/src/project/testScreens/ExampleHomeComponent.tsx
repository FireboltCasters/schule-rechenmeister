import React, {FunctionComponent, useEffect} from "react";
import {Text, View} from "native-base";
import {ConfigHolder, Navigation} from "kitcheningredients";
import {SelectAmountPlayersScreen} from "../screens/SelectAmountPlayersScreen";
import {MyButton} from "../components/MyButton";
import {MySpacer} from "../components/MySpacer";
import {MyHeading} from "../components/MyHeading";
import {AnimationKing} from "../animations/AnimationKing";
import {MyStates} from "../states/MyStates";

export const ExampleHomeComponent: FunctionComponent = (props) => {

    const [demo, setDemo] = MyStates.useDemo();
    const [players, setPlayers] = MyStates.usePlayers();
    const [currentPlayer, setCurrentPlayer, setNextCurrentPlayer] = MyStates.useCurrentPlayer();

    if(!ConfigHolder.instance.isDrawerHidden()){
        ConfigHolder.instance.setHideDrawer(true, Navigation.DEFAULT_ROUTE_HOME);
    }

    useEffect(() => {
        if(!demo){
            setPlayers({});
            setCurrentPlayer(null);
        }
    }, []);

  return (
    <View style={{width: "100%"}}>
        <View style={{width: "100%", alignItems: "center"}}><MyHeading>{"Wer wird Kopfrechenmeister?"}</MyHeading></View>
        <MySpacer />
        <View style={{width: "100%", alignItems: "center"}}>
            <View style={{width: "25%", alignItems: "center"}}>
                <AnimationKing />
            </View>
        </View>
        <MySpacer />
        <MyButton onPress={() => {
            Navigation.navigateTo(SelectAmountPlayersScreen, {key: Math.random()+""});
        }}>
            <Text fontSize={"6xl"}>{"Start"}</Text>
        </MyButton>
    </View>
  );
}
