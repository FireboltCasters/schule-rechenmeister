import React, {FunctionComponent, useEffect, useState} from "react";
import {Text, View} from "native-base";
import {MyStates} from "../states/MyStates";
import {CurrentPlayerName} from "./CurrentPlayerName";
import {MySpacer} from "./MySpacer";
import {PlayerStats} from "./PlayerStats";
import {MyButton} from "./MyButton";
import {MyFontSizes} from "./MyFontSizes";
import {GridList, Icon} from "kitcheningredients";
import {MyButtonView} from "./MyButtonView";
import {AnimationCorrect} from "../animations/AnimationCorrect";
import {AnimationWrong} from "../animations/AnimationWrong";

export const TaskTemplate: FunctionComponent = (props) => {

    const ANIMATION_CORRECT = "correct";
    const ANIMATION_WRONG = "wrong";

    const defaultGenerateTask = () => {
        return {
            task: "5+5",
            solution: 10,
        }
    }

    const useGenerateTaskFun = props?.generateTaskWithSolution || defaultGenerateTask;

    const [showAnimation, setShowAnimation] = useState("none");


    const [currentTaskWithSolution, setCurrentTaskWithSolution] = useState(useGenerateTaskFun())
    const task = currentTaskWithSolution?.task;
    const solution = currentTaskWithSolution?.solution;

    const [input, setInput] = useState("");

    const [currentPlayer, setCurrentPlayer, setNextCurrentPlayer] = MyStates.useCurrentPlayer();
    const [players, setPlayers] = MyStates.usePlayers();

    function renderTask(){
        return (
            <View style={{width: "100%", flexDirection: "row", alignItems: "center"}}>
                <View style={{width: "70%", alignItems: "center"}}><Text fontSize={"6xl"}>{"Was ergibt: "+task+" = "}</Text></View>
                <View style={{width: "30%", alignItems: "center"}}><MyButtonView><Text fontSize={"6xl"}>{input || " "}</Text></MyButtonView></View>
            </View>
        )
    }

    function renderAnimationOverlay(animationComponent){
        const correctSolutionView = (
            <View>
                <MyButtonView>
                    <Text fontSize={"6xl"}>{task+" = "+solution}</Text>
                </MyButtonView>
            </View>
        )

        return (
            <View style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", alignItems: "center", justifyContent: "center"}}>
                <View style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "white", opacity: 0.95}}></View>
                {correctSolutionView}
                {animationComponent}
            </View>
        )
    }

    function renderAnimation(){
        if(showAnimation === ANIMATION_CORRECT){
            return (
                renderAnimationOverlay(
                    <AnimationCorrect />
                )
            )
        } else if(showAnimation === ANIMATION_WRONG){
            return (
                renderAnimationOverlay(
                    <AnimationWrong />
                )
            )
        } else {
            return null;
        }
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
        const isCorrect = asNumber === solution;
        if(isCorrect){
            currentPlayer.score = parseInt(currentPlayer.score) + 1;
            players[currentPlayer.id] = currentPlayer;
            setPlayers(players);
        }
        setShowAnimation(isCorrect ? ANIMATION_CORRECT : ANIMATION_WRONG);
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

    useEffect(() => {
        // wait 3 seconds then hide animation
        if(showAnimation !== "none"){
            setTimeout(() => {
                    setShowAnimation("none");
                    setCurrentTaskWithSolution(useGenerateTaskFun());
                    setInput("");
                    setNextCurrentPlayer();
                }
                , 1800);
        }
    }, [showAnimation])

  return (
      <>
          <View style={{width: "100%"}}>
              <CurrentPlayerName />
              <MySpacer />
              {renderTask()}
              {renderInputRow()}
              <MySpacer />
              <PlayerStats />
          </View>
          {renderAnimation()}
      </>
  );
}
