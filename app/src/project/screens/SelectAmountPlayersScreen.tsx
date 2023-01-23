import React, {FunctionComponent} from "react";
import {Divider, Input, Spacer, Text, View} from "native-base";
import {ConfigHolder, GridList, Icon, Navigation} from "kitcheningredients";
import {MyStates} from "../states/MyStates";
import {MyButton} from "../components/MyButton";
import {MyButtonView} from "../components/MyButtonView";
import {SelectGameType} from "./SelectGameType";
import {MySpacer} from "../components/MySpacer";

export const SelectAmountPlayersScreen: FunctionComponent = (props) => {

    const maxPlayers = 4;

    const refs = {};

    const [players, setPlayers] = MyStates.usePlayers();

    const noPlayersCreated = Object.keys(players).length===0

    if(!ConfigHolder.instance.isDrawerHidden()){
        ConfigHolder.instance.setHideDrawer(true, Navigation.DEFAULT_ROUTE_HOME);
    }

    function renderEditPlayer(key: string){
        let player = players[key];

        return (
            <MyButtonView>
                <MyButtonView>
                    <Text>{"Spieler "+key}</Text>
                    <Input
                        getRef={(ref) => {
                            refs[key] = ref;}
                        }
                        allowFontScaling={true} style={{width: "100%", height: "100%", backgroundColor: "orange"}} placeholder={"Name"} onChangeText={(newName) => {
                        player.name = newName;
                        setPlayers({...players});
                    }} />
                </MyButtonView>
            </MyButtonView>
        )
    }

    function renderEditPlayers(){
        if(!noPlayersCreated){
            let output = [];
            let playerKeys = Object.keys(players);
            for(let i = 0; i < playerKeys.length; i++){
                let key = playerKeys[i];
                output.push(renderEditPlayer(key));
            }
            return output;
        }
        return null;
    }

    function renderContinue(){
        if(Object.keys(players).length > 0){
            let allPlayersHaveNames = true;
            let playerKeys = Object.keys(players);
            for(let i = 0; i < playerKeys.length; i++){
                let key = playerKeys[i];
                if(players[key].name === ""){
                    allPlayersHaveNames = false;
                    break;
                }
            }

            if(allPlayersHaveNames){
                return (
                    <MyButton onPress={() => {
                        Navigation.navigateTo(SelectGameType);
                    }}>
                        <Text>{"Weiter"}</Text>
                    </MyButton>
                )
            }
        }
    }

    function renderSelectAmountPlayers(){
        if(noPlayersCreated){
            let output = [];
            for(let i = 1; i <= maxPlayers; i++){
                output.push(<MyButton onPress={() => {
                        let newPlayers = {};
                        for(let j = 1; j <= i; j++){
                            let key = j;
                            let newPlayer = {
                                key: key,
                                name: "",
                                score: 0,
                            }
                            newPlayers[key] = newPlayer;
                        }
                        setPlayers(newPlayers);
                    }}>
                        <Text>{i+" Spieler"}</Text>
                    </MyButton>
                );
            }
            return output;
        }
        return null;
    }

    let content = noPlayersCreated ? renderSelectAmountPlayers() : renderEditPlayers();

  return (
    <View style={{width: "100%"}}>
        <View style={{width: "100%", alignItems: "center"}}><Text>{"Anzahl Spieler?"}</Text></View>
        <GridList>
            {content}
        </GridList>
        <MySpacer />
        <MySpacer />
        {renderContinue()}
        <Text>{JSON.stringify(players, null, 2)}</Text>
    </View>
  );
}
