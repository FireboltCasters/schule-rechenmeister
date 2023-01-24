import React, {FunctionComponent} from "react";
import {View, Text, ScrollView} from "native-base";
import {MyStates} from "../states/MyStates";
import {MyButtonView} from "../components/MyButtonView";
import {GoHome} from "../components/GoHome";
import {MyFontSizes} from "../components/MyFontSizes";
import {AnimationKing} from "../animations/AnimationKing";

export const PointOverview: FunctionComponent = (props) => {

    const [players, setPlayers] = MyStates.usePlayers();

    function renderPlayer(player){
        const score = player?.score || "0";

        return <MyButtonView>
            <Text fontSize={MyFontSizes.HEADING}>{player.name}</Text>
            <Text fontSize={MyFontSizes.HEADING}>{score}</Text>
        </MyButtonView>
    }

    function getSortedPlayerIds(){
        let playerIds = Object.keys(players);
        let sortedPlayerIds = playerIds.sort((a, b) => {
            return players[b]?.score - players[a]?.score;
        }
        );
        return sortedPlayerIds
    }

    function renderPlayers(){
        let output = [];
        let playerIds = getSortedPlayerIds();
        for(let i = 0; i < playerIds.length; i++){
            let player = players[playerIds[i]];
            output.push(renderPlayer(player));
            output.push(<View style={{height: "10px"}} />);
        }
        return output;
    }

  return (
      <View style={{width: "100%", padding: "20px"}}>
        <GoHome />
          <View style={{width: "100%", justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
              <View style={{width: "100px", height: "100px", alignItems: "center", justifyContent: "center"}}>
                      <AnimationKing />
              </View>
              <View style={{alignItems: "center", justifyContent: "center"}}>
                  <Text fontSize={MyFontSizes.HEADING} bold={true}>{"Punkte"}</Text>
              </View>
          </View>
          <View style={{width: "100%", height: "20px"}} />
        <ScrollView>
            {renderPlayers()}
        </ScrollView>
    </View>
  );
}
