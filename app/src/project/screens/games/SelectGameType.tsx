import React, {FunctionComponent} from "react";
import {ScrollView, Text, View} from "native-base";
import {GridList, Navigation} from "kitcheningredients";
import {MyButton} from "../../components/MyButton";
import {MyFontSizes} from "../../components/MyFontSizes";
import {GoBackRow} from "../../components/GoBackRow";
import {SelectGameAdditionAndSubtractionGameType} from "./additionAndSubtraction/SelectGameAdditionAndSubtractionGameType";
import {MyButtonView} from "../../components/MyButtonView";

export const SelectGameType: FunctionComponent = (props) => {

    function renderGameType(name ,component, params?){
        if(!params){
            params = {};
        }
        return (
            <MyButton onPress={() => {
                Navigation.navigateTo(component, {key: Math.random(), ...params});
            }}>
                <MyButtonView>
                    <Text fontSize={MyFontSizes.BUTTON}>{name}</Text>
                </MyButtonView>
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

  return (
    <View style={{width: "100%", padding: "20px"}}>
        <GoBackRow />
        <View style={{width: "100%", alignItems: "center"}}><Text fontSize={MyFontSizes.HEADING}>{"Wähle dein Spiel"}</Text></View>
        <ScrollView>
            <GridList beakpointsColumns={defaultBreakpoints} paddingVertical={"8%"} >
                {renderGameType("Rechnen bis 20", SelectGameAdditionAndSubtractionGameType, {max: 20})}
                {renderGameType("Rechnen bis 100", SelectGameAdditionAndSubtractionGameType, {max: 100})}
                {renderGameType("Das kleine 1x1 (todo)", SelectGameAdditionAndSubtractionGameType)}
            </GridList>
        </ScrollView>
    </View>
  );
}
