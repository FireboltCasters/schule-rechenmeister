import React, {FunctionComponent, useState} from "react";
import {Text, View} from "native-base";
import {MyStates} from "../states/MyStates";
import {CurrentPlayerName} from "./CurrentPlayerName";
import {MySpacer} from "./MySpacer";
import {PlayerStats} from "./PlayerStats";
import {MyButton} from "./MyButton";
import {MyFontSizes} from "./MyFontSizes";
import {GridList, Icon} from "kitcheningredients";
import {MyButtonView} from "./MyButtonView";

export const TaskTemplate: FunctionComponent = (props) => {

    const defaultGenerateTask = () => {
        return {
            task: "5+5",
            solution: 10,
        }
    }

    const useGenerateTaskFun = props?.generateTaskWithSolution || defaultGenerateTask;

    const [currentTaskWithSolution, setCurrentTaskWithSolution] = useState(useGenerateTaskFun())
    const task = currentTaskWithSolution?.task;
    const solution = currentTaskWithSolution?.solution;

    const [input, setInput] = useState("");

    const [currentPlayer, setCurrentPlayer, setNextCurrentPlayer] = MyStates.useCurrentPlayer();
    const [players, setPlayers] = MyStates.usePlayers();

    function renderTask(){
        return (
            <View style={{width: "100%", flexDirection: "row", alignItems: "center"}}>
                <View style={{width: "70%", alignItems: "center"}}><Text fontSize={"6xl"}>{task}</Text></View>
                <View style={{width: "30%", alignItems: "center"}}><MyButtonView><Text fontSize={"6xl"}>{input || " "}</Text></MyButtonView></View>
            </View>
        )
    }

    function renderInputFields(){
        let inputFields = [];
        for(let i=0; i<=9; i++){
            inputFields.push(
                <MyButton onPress={() => {
                    let nextInput = input + "" + i;
                    let asNumber = parseInt(nextInput);
                    setInput(""+asNumber);
                }}>
                    <Text fontSize={MyFontSizes.BUTTON}>{i}</Text>
                </MyButton>
            );
        }
        return inputFields;
    }

    function renderUserInputFields(){
        let defaultBreakpoints = {
            base: 5,
        }

        return (
            <View style={{width: "100%"}}>
                <GridList beakpointsColumns={defaultBreakpoints}>
                    {renderInputFields()}
                </GridList>
            </View>
        )
    }

    function handleConfirm(){
        let asNumber = parseInt(input);
        if(asNumber === solution){
            currentPlayer.score = parseInt(currentPlayer.score) + 1;
            players[currentPlayer.id] = currentPlayer;
            setPlayers(players);
        }
        setNextCurrentPlayer()
        if(useGenerateTaskFun){
            setInput("")
            setCurrentTaskWithSolution(useGenerateTaskFun());
        }
    }

    function renderConfirmAndReset(){
        let defaultBreakpoints = {
            base: 1,
        }

        return(
            <View style={{width: "100%"}}>
                <GridList beakpointsColumns={defaultBreakpoints}>
                    <MyButton style={{borderColor: "red", borderWidth: 3}} onPress={() => {
                        setInput("");
                    }}>
                        <Icon size={MyFontSizes.BUTTON} name={"trash-can"} />
                    </MyButton>
                    <MyButton onPress={() => {
                        handleConfirm();
                    }}>
                        <Icon size={MyFontSizes.BUTTON} name={"check"} />
                    </MyButton>
                </GridList>
            </View>
        )
    }

    function renderInputRow(){

        return (
            <View style={{width: "100%", flexDirection: "row"}}>
                <View style={{width: "70%"}}>
                    {renderUserInputFields()}
                </View>
                <View style={{width: "10%"}} />
                <View style={{width: "20%"}}>
                    {renderConfirmAndReset()}
                </View>
            </View>
        )
    }


  return (
    <View style={{width: "100%"}}>
        <CurrentPlayerName />
        <MySpacer />
        {renderTask()}
        {renderInputRow()}
        <MySpacer />
        <PlayerStats />
    </View>
  );
}
