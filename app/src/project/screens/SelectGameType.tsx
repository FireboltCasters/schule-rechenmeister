import React, {FunctionComponent} from "react";
import {Text, View} from "native-base";
import {GridList, Navigation} from "kitcheningredients";
import {AdditionWithTenTransition} from "./games/AdditionWithTenTransition";
import {MyButton} from "../components/MyButton";
import {MyStates} from "../states/MyStates";

export const SelectGameType: FunctionComponent = (props) => {

    const [playersDict, setPlayers] = MyStates.usePlayers();

    let playerKeys = Object.keys(playersDict);
    if(playerKeys.length === 0){
        Navigation.navigateTo(Navigation.DEFAULT_ROUTE_HOME);
        return <View />;
    }


    function renderGameType(name ,component){
        return (
            <MyButton onPress={() => {
                Navigation.navigateTo(component);
            }}>
                <Text>{name}</Text>
            </MyButton>
        );
    }

  return (
    <View style={{width: "100%"}}>
        <View style={{width: "100%", alignItems: "center"}}><Text>{"Wähle dein Spiel"}</Text></View>
        <GridList>
            {renderGameType("Addition einfach (todo)", AdditionWithTenTransition)}
            {renderGameType("Addition schwer (todo)", AdditionWithTenTransition)}
        </GridList>
    </View>
  );
}
