import React, {FunctionComponent} from "react";
import {Text, View} from "native-base";
import {GridList, Navigation} from "kitcheningredients";
import {AdditionWithTenTransition} from "./games/AdditionWithTenTransition";
import {MyButton} from "../components/MyButton";
import {MyStates} from "../states/MyStates";
import {MyFontSizes} from "../components/MyFontSizes";
import {AdditionWithoutTenTransition} from "./games/AdditionWithoutTenTransition";
import {AnimationDog} from "../animations/AnimationDog";
import {AnimationCat} from "../animations/AnimationCat";
import {MyButtonView} from "../components/MyButtonView";
import {SubtractionWithoutTenTransition} from "./games/SubtractionWithoutTenTransition";
import {SubtractionWithTenTransition} from "./games/SubtractionWithTenTransition";
import {AnimationPanda} from "../animations/AnimationPanda";
import {AnimationShark} from "../animations/AnimationShark";

export const SelectGameType: FunctionComponent = (props) => {

    const [playersDict, setPlayers] = MyStates.usePlayers();

    let playerKeys = Object.keys(playersDict);
    if(playerKeys.length === 0){
        Navigation.navigateTo(Navigation.DEFAULT_ROUTE_HOME);
        return <View />;
    }


    function renderGameType(name ,component, description?){
        return (
            <MyButton onPress={() => {
                Navigation.navigateTo(component);
            }}>
                <Text fontSize={MyFontSizes.HEADING}>{name}</Text>
                {description}
            </MyButton>
        );
    }

    let defaultBreakpoints = {
        base: 1,
        sm: 2,
        md: 2,
        lg: 2,
        xl: 2,
    }

  return (
    <View style={{width: "100%"}}>
        <View style={{width: "100%", alignItems: "center"}}><Text fontSize={MyFontSizes.HEADING}>{"Wähle dein Spiel"}</Text></View>
        <GridList beakpointsColumns={defaultBreakpoints}>
            {renderGameType("Addition einfach", AdditionWithoutTenTransition, <AnimationCat />)}
            {renderGameType("Addition schwer", AdditionWithTenTransition, <AnimationDog />)}
            {renderGameType("Subtraktion einfach", SubtractionWithoutTenTransition, <AnimationPanda />)}
            {renderGameType("Subtraktion schwer", SubtractionWithTenTransition, <AnimationShark />)}

        </GridList>
    </View>
  );
}
