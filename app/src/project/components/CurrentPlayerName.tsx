import React, {FunctionComponent} from "react";
import {View, Text} from "native-base";
import {MyStates} from "../states/MyStates";
import {MyButtonView} from "./MyButtonView";
import {GridList} from "kitcheningredients";
import {MyFontSizes} from "./MyFontSizes";

export const CurrentPlayerName: FunctionComponent = (props) => {

    const [currentPlayer, setCurrentPlayer, setNextCurrentPlayer] = MyStates.useCurrentPlayer();

  return (
    <View style={{width: "100%"}}>
        <MyButtonView>
            <Text fontSize={MyFontSizes.HEADING}>{currentPlayer.name+":"}</Text>
        </MyButtonView>
    </View>
  );
}
