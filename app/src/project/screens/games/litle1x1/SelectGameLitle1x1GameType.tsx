import React, {FunctionComponent} from "react";
import {ScrollView, Text, View} from "native-base";
import {GridList, Icon, Navigation} from "kitcheningredients";
import {MyButton} from "../../../components/MyButton";
import {MyStates} from "../../../states/MyStates";
import {MyFontSizes} from "../../../components/MyFontSizes";
import {GoBackRow} from "../../../components/GoBackRow";
import {MultiplicationCore} from "./MultiplicationCore";
import {MultiplicationAll} from "./MultiplicationAll";
import {DivisionAll} from "./DivisionAll";
import {DivisionCore} from "./DivisionCore";
import {MultiplicationDivisionMixCore} from "./MultiplicationDivisionMixCore";
import {MultiplicationDivisionMixAll} from "./MultiplicationDivisionMixAll";

export const SelectGameLitle1x1GameType: FunctionComponent = (props) => {

    const COLOR_EASY = "#d9ead3";
    const COLOR_MEDIUM = "#fff2cc";
    const COLOR_HARD = "#f4cccc";

    const [playersDict, setPlayers] = MyStates.usePlayers();

    let playerKeys = Object.keys(playersDict);
    if(playerKeys.length === 0){
        Navigation.navigateTo(Navigation.DEFAULT_ROUTE_HOME, {key: Math.random()});
        return <View />;
    }


    function renderGameType(name , description, component, level, color){
        return (
            <MyButton style={{backgroundColor: color}} onPress={() => {
                Navigation.navigateTo(component, {key: Math.random()});
            }}>
                <Text fontSize={MyFontSizes.HEADING} bold={true}>{name}</Text>
                <Text fontSize={MyFontSizes.HEADING} bold={true}>{description}</Text>
                {level}
            </MyButton>
        );
    }

    let defaultBreakpoints = {
        base: 2,
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

    function renderTasks(){
        let output = [];
        output.push(renderGameType("Multiplikation", "Kernaufgaben",  MultiplicationCore, renderStars(1), COLOR_EASY))
        output.push(renderGameType("Multiplikation", "Alle Aufgaben",MultiplicationAll, renderStars(2), COLOR_HARD))
        output.push(renderGameType("Division", "Kernaufgaben",DivisionCore, renderStars(1), COLOR_EASY))
        output.push(renderGameType("Division", "Alle Aufgaben",DivisionAll, renderStars(2), COLOR_HARD))
        output.push(renderGameType("Mix", "Kernaufgaben",MultiplicationDivisionMixCore, renderStars(1), COLOR_EASY))
        output.push(renderGameType("Mix", "Alle Aufgaben",MultiplicationDivisionMixAll, renderStars(2), COLOR_HARD))
        return output;
    }

  return (
    <View style={{width: "100%", padding: "20px"}}>
        <GoBackRow />
        <View style={{width: "100%", alignItems: "center"}}><Text fontSize={MyFontSizes.HEADING}>{"Wähle dein Spiel"}</Text></View>
        <ScrollView>
            <GridList beakpointsColumns={defaultBreakpoints} paddingVertical={"3%"} >
                {renderTasks()}
            </GridList>
        </ScrollView>
    </View>
  );
}
