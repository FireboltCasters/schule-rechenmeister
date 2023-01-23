import React, {FunctionComponent} from "react";
import {Divider, Input, Spacer, Text, View} from "native-base";
import {ConfigHolder, GridList, Icon, Navigation} from "kitcheningredients";
import {MyStates} from "../states/MyStates";
import {MyButton} from "../components/MyButton";
import {MyButtonView} from "../components/MyButtonView";
import {SelectGameType} from "./SelectGameType";
import {MySpacer} from "../components/MySpacer";

export const SelectAmountPlayersScreen: FunctionComponent = (props) => {

    const [players, setPlayers] = MyStates.usePlayers();

    if(!ConfigHolder.instance.isDrawerHidden()){
        ConfigHolder.instance.setHideDrawer(true, Navigation.DEFAULT_ROUTE_HOME);
    }

    function renderEditPlayer(key: string){
        let player = players[key];

        return (
            <MyButtonView>
                <MyButtonView>
                    <Text>{"Name"}</Text>
                    <Input placeholder={"Spielername"} onChangeText={(newName) => {
                        player.name = newName;
                        setPlayers({...players});
                    }} />
                </MyButtonView>
                <MyButton style={{backgroundColor: "red"}}>
                    <View style={{flexDirection: "row"}}>
                        <Icon name={"trash-can"} />
                        <Text>{"Löschen"}</Text>
                    </View>
                </MyButton>
            </MyButtonView>
        )
    }

    function renderSelectAmountPlayers(){
        let output = [];
        let playerKeys = Object.keys(players);
        for(let i = 0; i < playerKeys.length; i++){
            let key = playerKeys[i];
            output.push(renderEditPlayer(key));
        }
        return output;
    }

    function renderContinue(){
        if(Object.keys(players).length > 0){
            return (
                <MyButton onPress={() => {
                    Navigation.navigateTo(SelectGameType);
                }}>
                    <Text>{"Weiter"}</Text>
                </MyButton>
            )
        }
    }

  return (
    <View style={{width: "100%"}}>
        <View style={{width: "100%", alignItems: "center"}}><Text>{"Anzahl Spieler?"}</Text></View>
        <GridList>
            {renderSelectAmountPlayers()}
        </GridList>
        <MySpacer />
        <MyButton onPress={() => {
            let key = Math.random().toString(36).substring(7);
            let newPlayer = {
                key: key,
                name: "",
                score: 0,
            }
            players[key] = newPlayer;
            setPlayers(players);
        }}>
            <Text>{"Spieler hinzufügen"}</Text>
        </MyButton>
        <MySpacer />
        {renderContinue()}
        <Text>{JSON.stringify(players, null, 2)}</Text>
    </View>
  );
}
