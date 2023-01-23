import React, {FunctionComponent} from "react";
import {View, Text} from "native-base";
import {MyStates} from "../states/MyStates";
import {MyButtonView} from "./MyButtonView";
import {GridList} from "kitcheningredients";

export const PlayerStats: FunctionComponent = (props) => {

    const [players, setPlayers] = MyStates.usePlayers();
    const [currentPlayer, setCurrentPlayer, setNextCurrentPlayer] = MyStates.useCurrentPlayer();

    function renderPlayerStat(player){
        const isCurrentPlayer = player?.id === currentPlayer?.id;
        const style = isCurrentPlayer ? {borderColor: "orange", borderWidth: 3} : {};

        return (
            <MyButtonView style={style}>
                <Text>{player.name}</Text>
                <Text>{player?.score}</Text>
            </MyButtonView>
        )
    }

    function renderAllPlayerStats(){
        let keys = Object.keys(players);
        let playerStats = [];
        for(let i = 0; i < keys.length; i++){
            let player = players[keys[i]];
            playerStats.push(renderPlayerStat(player));
        }
        return playerStats;
    }

    let defaultBreakpoints = {
        base: 4,
        sm: 4,
        md: 4,
        lg: 4,
        xl: 4,
    }

  return (
    <View style={{width: "100%"}}>
        <GridList beakpointsColumns={defaultBreakpoints}>
            {renderAllPlayerStats()}
        </GridList>
    </View>
  );
}
