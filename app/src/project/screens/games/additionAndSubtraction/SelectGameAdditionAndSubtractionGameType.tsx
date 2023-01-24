import React, {FunctionComponent} from "react";
import {ScrollView, Text, View} from "native-base";
import {GridList, Icon, Navigation} from "kitcheningredients";
import {AdditionWithTenTransition} from "./AdditionWithTenTransition";
import {MyButton} from "../../../components/MyButton";
import {MyStates} from "../../../states/MyStates";
import {MyFontSizes} from "../../../components/MyFontSizes";
import {AdditionWithoutTenTransition} from "./AdditionWithoutTenTransition";
import {SubtractionWithoutTenTransition} from "./SubtractionWithoutTenTransition";
import {SubtractionWithTenTransition} from "./SubtractionWithTenTransition";
import {AdditionWithTenTransitionSingleNumber} from "./AdditionWithTenTransitionSingleNumber";
import {SubtractionWithTenTransitionSingleNumber} from "./SubtractionWithTenTransitionSingleNumber";
import {GoBackRow} from "../../../components/GoBackRow";
import {MixWithoutTenTransition} from "./MixWithoutTenTransition";
import {MixWithTenTransition} from "./MixWithTenTransition";
import {MixWithTenTransitionSingleNumber} from "./MixWithTenTransitionSingleNumber";

export const SelectGameAdditionAndSubtractionGameType: FunctionComponent = (props) => {

    const COLOR_EASY = "#d9ead3";
    const COLOR_MEDIUM = "#fff2cc";
    const COLOR_HARD = "#f4cccc";

    const max = props?.route?.params?.max;

    const [playersDict, setPlayers] = MyStates.usePlayers();

    let playerKeys = Object.keys(playersDict);
    if(playerKeys.length === 0){
        Navigation.navigateTo(Navigation.DEFAULT_ROUTE_HOME, {key: Math.random()});
        return <View />;
    }


    function renderGameType(name ,component, description, color){
        return (
            <MyButton style={{backgroundColor: color}} onPress={() => {
                Navigation.navigateTo(component, {key: Math.random(), max: max});
            }}>
                <Text fontSize={MyFontSizes.HEADING} bold={true}>{name}</Text>
                {description}
            </MyButton>
        );
    }

    const amountColumns = max+"" === ""+20 ? 2 : 3;

    let defaultBreakpoints = {
        base: amountColumns,
        sm: amountColumns,
        md: amountColumns,
        lg: amountColumns,
        xl: amountColumns,
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
        if(max+"" === ""+20){
            output.push(renderGameType("Addition", AdditionWithoutTenTransition, renderStars(1), COLOR_EASY))
            output.push(renderGameType("Addition", AdditionWithTenTransition, renderStars(2), COLOR_HARD))
            output.push(renderGameType("Subtraktion", SubtractionWithoutTenTransition, renderStars(1), COLOR_EASY))
            output.push(renderGameType("Subtraktion", SubtractionWithTenTransition, renderStars(2), COLOR_HARD))
            output.push(renderGameType("Mix", MixWithoutTenTransition, renderStars(1), COLOR_EASY))
            output.push(renderGameType("Mix", MixWithTenTransition, renderStars(2), COLOR_HARD))
        } else {
            output.push(renderGameType("Addition", AdditionWithoutTenTransition, renderStars(1), COLOR_EASY))
            output.push(renderGameType("Addition", AdditionWithTenTransitionSingleNumber, renderStars(2), COLOR_MEDIUM))
            output.push(renderGameType("Addition", AdditionWithTenTransition, renderStars(3), COLOR_HARD))
            output.push(renderGameType("Subtraktion", SubtractionWithoutTenTransition, renderStars(1), COLOR_EASY))
            output.push(renderGameType("Subtraktion", SubtractionWithTenTransitionSingleNumber, renderStars(2), COLOR_MEDIUM))
            output.push(renderGameType("Subtraktion", SubtractionWithTenTransition, renderStars(3), COLOR_HARD))
            output.push(renderGameType("Mix", MixWithoutTenTransition, renderStars(1), COLOR_EASY))
            output.push(renderGameType("Mix", MixWithTenTransitionSingleNumber, renderStars(2), COLOR_MEDIUM))
            output.push(renderGameType("Mix", MixWithTenTransition, renderStars(3), COLOR_HARD))
        }
        return output;
    }

  return (
    <View style={{width: "100%", padding: "20px"}}>
        <GoBackRow />
        <View style={{width: "100%", alignItems: "center"}}><Text fontSize={MyFontSizes.HEADING}>{"Wähle dein Spiel"}</Text></View>
        <View style={{width: "100%", alignItems: "center"}}><Text fontSize={MyFontSizes.HEADING}>{"Rechnen bis "+max}</Text></View>
        <ScrollView>
            <GridList beakpointsColumns={defaultBreakpoints} paddingVertical={"3%"} >
                {renderTasks()}
            </GridList>
        </ScrollView>
    </View>
  );
}
