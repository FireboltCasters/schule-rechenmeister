import React, {FunctionComponent} from "react";
import {ScrollView, Text, View} from "native-base";
import {GridList, Icon, Navigation} from "kitcheningredients";
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
import {AdditionWithTenTransitionSingleNumber} from "./games/AdditionWithTenTransitionSingleNumber";
import {SubtractionWithTenTransitionSingleNumber} from "./games/SubtractionWithTenTransitionSingleNumber";
import {GoBackRow} from "../components/GoBackRow";

export const SelectGameType: FunctionComponent = (props) => {

    const COLOR_EASY = "#d9ead3";
    const COLOR_MEDIUM = "#fff2cc";
    const COLOR_HARD = "#f4cccc";

    const [playersDict, setPlayers] = MyStates.usePlayers();

    let playerKeys = Object.keys(playersDict);
    if(playerKeys.length === 0){
        Navigation.navigateTo(Navigation.DEFAULT_ROUTE_HOME, {key: Math.random()});
        return <View />;
    }


    function renderGameType(name ,component, description, color){
        return (
            <MyButton style={{backgroundColor: color}} onPress={() => {
                Navigation.navigateTo(component, {key: Math.random()});
            }}>
                <Text fontSize={MyFontSizes.HEADING} bold={true}>{name}</Text>
                {description}
            </MyButton>
        );
    }

    let defaultBreakpoints = {
        base: 3,
        sm: 3,
        md: 3,
        lg: 3,
        xl: 3,
    }

    function renderStars(amount: number){

        let difficutlies = ["einfach", "mittel", "schwer"];

        let stars = [];
        for(let i = 0; i < amount; i++){
            stars.push(<Icon size={MyFontSizes.HEADING} name="star" color="#FFD700" />);
        }

        let difficulty = difficutlies[amount - 1] || difficutlies[difficutlies.length - 1];

        return (
            <View style={{alignItems: "center", justifyContent: "center"}}>
                <Text fontSize={MyFontSizes.HEADING}>{difficulty}</Text>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                    {stars}
                </View>
            </View>
        );
    }

  return (
    <View style={{width: "100%", padding: "20px"}}>
        <GoBackRow />
        <View style={{width: "100%", alignItems: "center"}}><Text fontSize={MyFontSizes.HEADING}>{"Wähle dein Spiel"}</Text></View>
        <ScrollView>
            <GridList beakpointsColumns={defaultBreakpoints} paddingVertical={"8%"} >
                {renderGameType("Addition", AdditionWithoutTenTransition, renderStars(1), COLOR_EASY)}
                {renderGameType("Addition", AdditionWithTenTransitionSingleNumber, renderStars(2), COLOR_MEDIUM)}
                {renderGameType("Addition", AdditionWithTenTransition, renderStars(3), COLOR_HARD)}
                {renderGameType("Subtraktion", SubtractionWithoutTenTransition, renderStars(1), COLOR_EASY)}
                {renderGameType("Subtraktion", SubtractionWithTenTransitionSingleNumber, renderStars(2), COLOR_MEDIUM)}
                {renderGameType("Subtraktion", SubtractionWithTenTransition, renderStars(3), COLOR_HARD)}

            </GridList>
        </ScrollView>
    </View>
  );
}
