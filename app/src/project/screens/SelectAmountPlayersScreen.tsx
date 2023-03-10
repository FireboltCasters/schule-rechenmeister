import React, {FunctionComponent} from "react";
import {Divider, Input, Spacer, Text, View} from "native-base";
import {ConfigHolder, GridList, Icon, Navigation} from "kitcheningredients";
import {MyStates} from "../states/MyStates";
import {MyButton} from "../components/MyButton";
import {MyButtonView} from "../components/MyButtonView";
import {MySpacer} from "../components/MySpacer";
import {MyHeading} from "../components/MyHeading";
import {MyFontSizes} from "../components/MyFontSizes";
import {GoBackRow} from "../components/GoBackRow";
import {SelectGameType} from "./games/SelectGameType";

export const SelectAmountPlayersScreen: FunctionComponent = (props) => {

    const maxPlayers = 4;

    const refs = {};

    const [players, setPlayers] = MyStates.usePlayers();

    const noPlayersCreated = Object.keys(players).length===0

    if(!ConfigHolder.instance.isDrawerHidden()){
        ConfigHolder.instance.setHideDrawer(true, Navigation.DEFAULT_ROUTE_HOME);
    }

    function renderEditPlayer(id: string){
        let player = players[id];

        return (
            <MyButtonView>
                <MyButtonView>
                    <Text fontSize={MyFontSizes.HEADING}>{"Spieler "+id}</Text>
                    <Input fontSize={MyFontSizes.HEADING}
                        getRef={(ref) => {
                            refs[id] = ref;}
                        }
                           value={player?.name}
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
                let id = playerKeys[i];
                output.push(renderEditPlayer(id));
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
                let id = playerKeys[i];
                if(players[id].name === ""){
                    allPlayersHaveNames = false;
                    break;
                }
            }

            const continueStyle = allPlayersHaveNames ? {} : {opacity: 0};

                return (
                    <View style={continueStyle}>
                        <MyButton onPress={() => {
                            Navigation.navigateTo(SelectGameType, {key: Math.random()});
                        }}>
                            <Text fontSize={MyFontSizes.BUTTON}>{"Weiter"}</Text>
                        </MyButton>
                    </View>
                )
        }
    }

    function renderSelectAmountPlayers(){
        if(noPlayersCreated){
            let output = [];
            for(let i = 1; i <= maxPlayers; i++){
                output.push(<MyButton onPress={() => {
                        let newPlayers = {};
                        for(let j = 1; j <= i; j++){
                            let id = j;
                            let newPlayer = {
                                id: id,
                                name: "",
                                score: 0,
                            }
                            newPlayers[id] = newPlayer;
                        }
                        setPlayers(newPlayers);
                    }}>
                        <Text fontSize={MyFontSizes.BUTTON}>{i+" Spieler"}</Text>
                    </MyButton>
                );
            }
            return output;
        }
        return null;
    }

    let content = noPlayersCreated ? renderSelectAmountPlayers() : renderEditPlayers();

    let defaultBreakpoints = {
        base: 1,
        sm: 2,
        md: 2,
        lg: 2,
        xl: 2,
    }

    const title = noPlayersCreated ? "Spieler" : "Name";

  return (
    <View style={{width: "100%", height: "100%", padding: "20px"}}>
        <GoBackRow />
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <View style={{width: "100%", alignItems: "center"}}><MyHeading>{title}</MyHeading></View>
            <GridList beakpointsColumns={defaultBreakpoints}>
                {content}
            </GridList>
            <MySpacer />
            {renderContinue()}
        </View>
    </View>
  );
}
